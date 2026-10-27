import type { ReactNode } from "react";
import { Box, Centered } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

/** 가운데 화면 양옆에 화면 두 개를 부채꼴로 겹친다. 좁은 화면은 가운데 화면만 보인다. */
export function PhoneFan({
  center,
  start,
  end,
  className,
}: {
  center: ReactNode;
  start: ReactNode;
  end: ReactNode;
  className?: string;
}) {
  return (
    <Centered className={cn("relative", className)}>
      <Box className="absolute top-[10%] left-[2%] hidden w-[200px] -rotate-8 lg:block">
        <Box data-motion="float">{start}</Box>
      </Box>
      <Box className="absolute top-[10%] right-[2%] hidden w-[200px] rotate-8 lg:block">
        <Box data-motion="float">{end}</Box>
      </Box>
      <Box className="relative">{center}</Box>
    </Centered>
  );
}
