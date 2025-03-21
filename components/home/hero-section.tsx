import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 lg;py-20 lg:py-24 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-emerald-200 via-emerald-500 to-emerald-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-emerald-50 transition-colors duration-200"
        >
          <Sparkles className="w-6 h-6 mr-2 text-emerald-500 animate-pulse" />
          <p className="text-base text-emerald-500">Powered by AI</p>
        </Badge>
      </div>
      <h1 className="font-bold py-6 text-center">
        Transform your PDFs into{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise summaries</span>
          <span
            className="absolute inset-0 bg-emerald-500/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>{" "}
        </span>
        with AI
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of your PDF in seconds.
      </h2>
      <div>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:no-underline font-bold shadow-lg transition-all duration-300"
        >
          <Link href="/#pricing" className="flex items-center gap-2">
            <span>Try Brevia</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
