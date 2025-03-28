import { cn } from "@/lib/utils";

export default function BgGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
    >
      {/* Original polygon */}
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        className={cn(
          "absolute left-[calc(50%-11rem)] top-0 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]",
          className
        )}
      />

      {/* Top right polygon */}
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        className={cn(
          "absolute right-[10%] top-[15%] aspect-[1155/678] w-[36.125rem] rotate-[65deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-15 sm:w-[50rem]",
          className
        )}
      />

      {/* Bottom left polygon */}
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        className={cn(
          "absolute left-[5%] top-[60%] aspect-[1155/678] w-[36.125rem] -rotate-[45deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-25 sm:w-[60rem]",
          className
        )}
      />

      {/* Bottom right polygon */}
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        className={cn(
          "absolute right-[8%] top-[75%] aspect-[1155/678] w-[36.125rem] rotate-[15deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:w-[55rem]",
          className
        )}
      />
    </div>
  );
}
