"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 16 * 1024 * 1024,
      "File size must be less than 16MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (data) => {
      toast.success("Upload successful", {
        description: "Please wait while we process the file",
      });
    },
    onUploadError: (error: Error) => {
      toast.error("Error occured while uploading", {
        description: error.message,
      });
    },
    onUploadBegin: () => {
      toast.info("Uploading...", {
        description: "Please wait while we upload the file",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(e.target as HTMLFormElement);
    const file = formData.get("file") as File;
    console.log(file);

    // Validate the fields
    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      toast.error("Something went wrong.", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file",
      });
      return;
    }

    toast.info("Uploading your PDF...", {
      description: "Please wait while we upload the file",
    });

    // Upload the file to uploadthing
    const response = await startUpload([file]);

    if (!response) {
      toast.error("Failed to upload file", {
        description: "Please try again or use a different file",
      });
      return;
    }

    toast.info("Processing your PDF...", {
      description: "Please wait while our AI works its magic",
    });

    // Parse the pdf using langchain

    // Summarize the pdf using ai

    // Save the summary to the database

    // Redirect to the [id] summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
