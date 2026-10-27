import { BrandMotif } from "@/components/marketing/brand-motif";
import { Box } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

// 바깥 아치(반지름 48%) 위의 150°·165°·180°·195° 지점. 발끝이 아치를 따라 위로 향한다.
const trailPaws = [
  "top-[71.8%] left-[7.4%] -rotate-[30deg]",
  "top-[60.2%] left-[0.2%] -rotate-[15deg]",
  "top-[47.8%] left-[0.9%] rotate-0",
  "top-[35.3%] left-[0.2%] rotate-[15deg]",
] as const;

/** 히어로 기기 뒤의 부드러운 빛과 얇은 동심 아치, 아치를 따라 걸어 들어오는 발자국 */
export function PawOrbitBackdrop({ className }: { className?: string }) {
  return (
    <Box aria-hidden="true" className={cn("relative", className)}>
      <Box className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand-soft),var(--brand)_30%)_0%,color-mix(in_oklab,var(--brand-soft),var(--brand)_10%)_50%,color-mix(in_oklab,var(--brand-soft)_50%,transparent)_78%,transparent_100%)] dark:bg-[radial-gradient(closest-side,var(--brand-soft)_0%,color-mix(in_oklab,var(--brand-soft)_55%,transparent)_55%,transparent_100%)]" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full overflow-visible text-brand/25 dark:text-brand/20"
      >
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="300 304"
          transform="rotate(205 100 100)"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="200 303"
          transform="rotate(-30 100 100)"
        />
        <circle
          cx="100"
          cy="100"
          r="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="2 4"
        />
      </svg>
      {trailPaws.map((position) => (
        <BrandMotif
          key={position}
          motif="paw"
          className={cn(
            "absolute size-[4.5%] text-brand/35 dark:text-brand/30",
            position,
          )}
        />
      ))}
    </Box>
  );
}
