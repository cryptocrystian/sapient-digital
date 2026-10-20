import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-medium text-sm tracking-tight transition-colors duration-200 ease-sapient focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-canvas hover:bg-forest",
        signal:
          "bg-signal text-ink hover:bg-[#E64616]",
        onInk:
          "bg-canvas text-ink hover:bg-paper",
        ghost:
          "bg-transparent text-ink border border-rule hover:bg-paper",
        ghostInk:
          "bg-transparent text-canvas border border-canvas/25 hover:bg-canvas/10",
        link:
          "p-0 h-auto bg-transparent text-ink underline underline-offset-4 decoration-rule hover:decoration-signal",
      },
      size: {
        md: "h-11 px-4",
        lg: "h-12 px-5",
        xl: "h-14 px-6 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
    compoundVariants: [
      { variant: "link", size: "md", className: "h-auto px-0" },
      { variant: "link", size: "lg", className: "h-auto px-0" },
      { variant: "link", size: "xl", className: "h-auto px-0" },
    ],
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
LinkButton.displayName = "LinkButton";

export { buttonVariants };
