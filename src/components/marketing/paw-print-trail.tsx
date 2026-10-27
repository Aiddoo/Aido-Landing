import { times } from "es-toolkit/compat";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { VStack } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export type PawPrintTrailProps = {
  /** 발자국 수. 먼저 찍힌(아래쪽) 발자국일수록 옅어진다. */
  steps?: number;
  /** 위치·크기·걷는 방향(회전)은 쓰는 쪽이 정한다. 기본 방향은 위로 걷는다. */
  className?: string;
};

/** 고양이가 걸어간 발자국 흔적. 좌우 발이 번갈아 찍히고 aria-hidden 장식이다. */
export function PawPrintTrail({ steps = 3, className }: PawPrintTrailProps) {
  return (
    <VStack
      aria-hidden="true"
      gap={2}
      className={cn("pointer-events-none w-max flex-col-reverse", className)}
    >
      {times(steps, (step) => (
        <BrandMotif
          key={step}
          motif="paw"
          className={cn(
            "size-5",
            steps - step > 2 && "opacity-45",
            steps - step === 2 && "opacity-70",
            step % 2 === 0
              ? "-translate-x-1/2 -rotate-6"
              : "translate-x-1/2 rotate-6",
          )}
        />
      ))}
    </VStack>
  );
}
