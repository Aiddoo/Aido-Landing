import { times } from "es-toolkit/compat";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { Centered, Grid, type GridProps } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

const BOARD_SIZE = 12;

export type PawBoardProps = Omit<GridProps, "children" | "columns"> & {
  /** 찍힌 발자국 수(0–12). 앱의 발자국 모으기 판처럼 앞칸부터 채운다. */
  stamped: number;
  label: string;
};

/** 앱 ‘발자국 모으기’ 판을 본뜬 12칸 그림. */
export function PawBoard({
  stamped,
  label,
  className,
  ...props
}: PawBoardProps) {
  return (
    <Grid
      role="img"
      aria-label={label}
      gap={3}
      className={cn("grid-cols-4", className)}
      {...props}
    >
      {times(BOARD_SIZE, (index) => (
        <Centered
          key={index}
          data-stamped={index < stamped ? "" : undefined}
          className="aspect-square rounded-full border-2 border-dashed border-gray-4 text-gray-4 data-stamped:border-solid data-stamped:border-brand-deep/30 data-stamped:bg-brand data-stamped:text-white"
        >
          <BrandMotif motif="paw" className="size-1/2" />
        </Centered>
      ))}
    </Grid>
  );
}
