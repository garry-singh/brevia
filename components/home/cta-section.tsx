import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-12">
      <div className="py-12 lg:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text:4xl md:text-5xl">
              Ready to save hours of reading time?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Transform lengthy documents into clear, actionable summaries with
              Brevia.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <div>
              <Button
                size={"lg"}
                variant={"link"}
                className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-emerald-500 hover:from-emerald-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300"
              >
                <Link
                  href="/#pricing"
                  className="flex items-center justify-center"
                >
                  Get Started{" "}
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
