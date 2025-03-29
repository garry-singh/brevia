import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-emerald-200 via-emerald-500 to-emerald-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-emerald-50 transition-colors duration-200"
        >
          <Sparkles className="w-6 h-6 mr-2 text-emerald-500 animate-pulse" />
          <p className="text-base text-emerald-500">Powered by AI</p>
        </Badge>
      </div>
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm-:text-4xl">
        <h1>
          Start Uploading{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">your PDF</span>
            <span
              className="absolute inset-0 bg-emerald-500/50 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>
        </h1>
      </div>
      <div className="text-lg mt-2 leading-8 text-gray-600 max-w-2xl">
        <p>Watch our AI transform your PDF into a summary reel!</p>
      </div>
    </div>
  );
}
