// src/components/ui/contact-button.tsx
import { FC, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ContactButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "orange";
  size?: "default" | "lg" | "sm";
  className?: string;
  children: React.ReactNode;
}

export const ContactButton: FC<ContactButtonProps> = ({
  variant = "orange",
  size = "default",
  className,
  children,
  ...props
}) => {
  return (
    <Button
      className={cn(
        // Base styles
        "font-medium rounded-lg ",
        // Orange variant styles (updated to match image)
        variant === "orange" &&
          "bg-gradient-to-r from-orange-500 to-yellow-300 hover:from-orange-600 hover:to-yellow-400 text-white border-none shadow-[4px_4px_0px_0px_rgba(255,140,0,0.7)] ",
        // Size variations
        size === "lg" && "text-lg py-6 px-8",
        size === "default" && "py-4 px-6",
        size === "sm" && "text-sm py-2 px-4",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
