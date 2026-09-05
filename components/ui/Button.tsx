"use client";

import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gold";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm border border-transparent",
  secondary:
    "bg-white text-foreground border border-border hover:bg-background-subtle hover:border-border-hover shadow-subtle",
  outline:
    "bg-transparent text-primary border border-primary hover:bg-primary/10",
  ghost:
    "bg-transparent text-foreground hover:bg-background-subtle hover:text-foreground",
  gold:
    "bg-accent-gold text-foreground font-medium hover:bg-accent-gold-hover border border-transparent shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-md gap-1.5",
  md: "h-10 px-4 py-2 text-sm rounded-md gap-2",
  lg: "h-12 px-6 py-3 text-base rounded-lg gap-2.5",
  icon: "h-10 w-10 p-0 rounded-md justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        type={type}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...(props as any)}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
            {children && <span className="opacity-80">{children}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0 inline-flex">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
