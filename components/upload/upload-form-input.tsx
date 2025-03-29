"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex justify-end items-center gap-2">
        <Input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button>Upload your PDF</Button>
      </div>
    </form>
  );
}
