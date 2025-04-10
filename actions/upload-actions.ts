'use server';

import { getDbConnection } from '@/lib/db';
import { generateSummaryFromGemini } from '@/lib/geminiai';
import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openai';
import { formatFileNameAsTitle } from '@/utils/format-utils';
import { auth } from '@clerk/nextjs/server';

export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      userId: string;
      fileUrl: string;
    };
  }[]
) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: 'No upload response found',
      data: null,
    };
  }

  const {
    serverData: { userId, fileUrl: pdfUrl },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'No PDF URL found',
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log(summary);
    } catch (error) {
      console.error(error);
      // Call Gemini API
      if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (error) {
          console.error('Error from Gemini', error);
          throw new Error('Failed to generate summary with available models');
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: 'Failed to generate summary',
        data: null,
      };
    }

    // Extract filename from the URL
    const fileName = pdfUrl.split('/').pop() || 'Untitled';
    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: 'Summary generated successfully',
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }
}

async function savePdfSummaryToDb(
  summary: string,
  fileUrl: string,
  status: string,
  title: string,
  fileName: string,
  userId?: string
) {
  // SQL inserting pdf summary
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, status, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${status}, ${title}, ${fileName})`;
  } catch (error) {
    console.error('Error saving PDF summary', error);
    throw error;
  }
}

export async function storePDFSummary(
  summary: string,
  fileUrl: string,
  status: string,
  title: string,
  fileName: string
) {
  // User is logged in and has a userId

  // savePDFSummary to db
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    savedSummary = await savePdfSummaryToDb(
      summary,
      fileUrl,
      status,
      title,
      fileName,
      userId
    );

    if (!savedSummary) {
      return {
        success: false,
        message: 'Failed to save PDF summary, please try again...',
      };
    }

    return {
      success: true,
      message: 'PDF summary saved successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error saving PDF summary',
    };
  }
}
