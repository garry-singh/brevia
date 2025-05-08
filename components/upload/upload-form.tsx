'use client';

import { z } from 'zod';
import UploadFormInput from './upload-form-input';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { generatePdfSummary, storePDFSummary } from '@/actions/upload-actions';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type SummaryResponse = {
  success: boolean;
  message: string;
  data: {
    summary: string;
    title: string;
  } | null;
};

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    .refine(
      (file) => file.size <= 16 * 1024 * 1024,
      'File size must be less than 16MB'
    )
    .refine(
      (file) => file.type.startsWith('application/pdf'),
      'File must be a PDF'
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: (data) => {
      toast.success('Upload successful', {
        description: 'Please wait while we process the file',
      });
    },
    onUploadError: (error: Error) => {
      toast.error('Error occured while uploading', {
        description: error.message,
      });
    },
    onUploadBegin: () => {
      toast.info('Starting upload', {
        description: 'We are starting the upload process',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const file = formData.get('file') as File;
      console.log(file);

      // Validate the fields
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error('Something went wrong.', {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            'Invalid file',
        });
        setIsLoading(false);
        return;
      }

      toast.info('Uploading your PDF...', {
        description: 'Please wait while we upload the file',
      });

      // Upload the file to uploadthing
      const response = await startUpload([file]);

      if (!response) {
        toast.error('Failed to upload file', {
          description: 'Please try again or use a different file',
        });
        setIsLoading(false);
        return;
      }

      toast.info('Processing your PDF...', {
        description: 'Please wait while our AI works its magic',
      });

      // Parse the pdf using langchain
      const summary = (await generatePdfSummary(response)) as SummaryResponse;

      if (summary?.data?.summary) {
        let storeResult: any;
        toast.success('Saving PDF summary...', {
          description: 'Hang tight! We are saving your summary.',
        });

        formRef.current?.reset();

        // Save the summary to the database
        storeResult = await storePDFSummary(
          summary.data.summary,
          response[0].serverData.fileUrl,
          'completed',
          summary.data.title || 'Untitled',
          file.name || 'Untitled.pdf'
        );

        toast.success('Summary generated successfully', {
          description:
            'Your PDF summary has been successfully summarized and saved.',
        });

        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
      } else {
        toast.error('Failed to generate summary', {
          description: summary?.message || 'Please try again',
        });
      }
      // Redirect to the [id] summary page
    } catch (error) {
      setIsLoading(false);
      console.error('Error occured', error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
