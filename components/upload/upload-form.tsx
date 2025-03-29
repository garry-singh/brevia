"use client";

import UploadFormInput from "./upload-form-input";

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(e.target as HTMLFormElement);
    const file = formData.get("file") as File;
    console.log(file);

    // Validate the fields
    // Schema validation
    // Upload the file to uploadthing
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
