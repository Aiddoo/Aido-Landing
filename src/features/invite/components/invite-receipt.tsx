import { Box, type BoxProps, VStack } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

type InviteReceiptProps = Omit<BoxProps, "render">;

// 톱니 가장자리 영수증 종이. 안쪽 줄은 InviteReceipt.Divider로 나눈다.
export function InviteReceipt({
  className,
  children,
  ...props
}: InviteReceiptProps) {
  return (
    <Box
      className={cn(
        "drop-shadow-[0_18px_28px_hsl(var(--shadow-color)/0.18)]",
        className,
      )}
      {...props}
    >
      <VStack className="receipt-edge bg-card px-6 pt-9 pb-10">
        {children}
      </VStack>
    </Box>
  );
}

function InviteReceiptDivider() {
  return (
    <Box
      render={<hr />}
      className="my-3.5 border-0 border-t-2 border-dashed border-gray-4"
    />
  );
}

InviteReceipt.Divider = InviteReceiptDivider;
