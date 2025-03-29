import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";

export default function UploadPage() {
  return (
    <section className="flex min-h-screen justify-center">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}
