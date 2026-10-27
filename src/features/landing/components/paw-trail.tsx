import { BrandMotif } from "@/components/marketing/brand-motif";
import { Box } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

/** 화면 뒤로 고양이가 걸어간 발자국과 생선 뼈 장식 */
export function PawTrail({ className }: { className?: string }) {
  return (
    <Box aria-hidden="true" className={cn("text-brand/30", className)}>
      <BrandMotif
        motif="paw"
        className="absolute top-[4%] right-[10%] size-7 rotate-[24deg]"
      />
      <BrandMotif
        motif="paw"
        className="absolute top-[14%] right-[2%] size-6 rotate-[38deg]"
      />
      <BrandMotif
        motif="paw"
        className="absolute top-[58%] left-[2%] size-6 -rotate-[20deg]"
      />
      <BrandMotif
        motif="fish-bone"
        className="absolute right-[20%] bottom-[6%] h-6 w-12 -rotate-12 text-fish/40"
      />
    </Box>
  );
}
