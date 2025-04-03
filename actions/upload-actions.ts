'use server';

import { generateSummaryFromGemini } from '@/lib/geminiai';
import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openai';

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

    return {
      success: true,
      message: 'Summary generated successfully',
      data: summary,
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
