import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold max-w-2xl mx-auto px-4 sm:px-6">
              Watch how Brevia transforms{" "}
              <span className="bg-linear-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{" "}
              into an easy-to-read summary reel!
            </h3>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            SUMMARY VIEWER
          </div>
        </div>
      </div>
    </section>
  );
}
