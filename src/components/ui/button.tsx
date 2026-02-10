import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap wobbly border-[3px] text-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hand-shadow-hover hand-shadow-active",
  {
    variants: {
      variant: {
        default: "bg-brand text-brand-foreground border-foreground hand-shadow",
        outline: "border-foreground bg-white text-foreground hand-shadow",
        secondary: "bg-muted text-foreground border-foreground hand-shadow",
        ghost: "border-transparent hover:bg-muted",
        link: "text-brand underline-offset-4 hover:underline border-none shadow-none translate-0!",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-10 px-4 text-sm",
        lg: "h-16 px-12 text-2xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
