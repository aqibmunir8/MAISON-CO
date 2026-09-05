import React from "react";
import { cn } from "@/lib/utils";
import type { DietaryTag } from "@/types";

export type BadgeVariant =
  | DietaryTag
  | "primary"
  | "gold"
  | "secondary"
  | "outline"
  | "success";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  children?: React.ReactNode;
  className?: string;
  label?: string;
}

const dietaryDescriptions: Record<DietaryTag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-Free",
  DF: "Dairy-Free",
  NF: "Nut-Free",
  RAW: "Raw / Unpasteurized",
};

const variantStyles: Record<BadgeVariant, string> = {
  // Dietary Badges
  V: "bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/60",
  VG: "bg-[#E8F3EE] text-[#1E6B52] border-[#1E6B52]/20 hover:bg-[#DCECE5]",
  GF: "bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100/60",
  DF: "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200/60",
  NF: "bg-[#F4F4F0] text-[#525866] border-[#E8E8E2] hover:bg-[#EBEBE5]",
  RAW: "bg-indigo-50 text-indigo-800 border-indigo-200/80 hover:bg-indigo-100/60",

  // Theme Badges
  primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
  gold: "bg-accent-gold-subtle text-[#8B6E38] border-accent-gold/40 hover:bg-[#F0EAE0]",
  secondary: "bg-surface-subtle text-foreground-muted border-border hover:bg-background-subtle",
  outline: "bg-transparent text-foreground-muted border-border hover:border-border-hover",
  success: "bg-success-bg text-success border-success/20",
};

const dotColors: Record<BadgeVariant, string> = {
  V: "bg-emerald-500",
  VG: "bg-[#1E6B52]",
  GF: "bg-amber-500",
  DF: "bg-slate-500",
  NF: "bg-[#848C9E]",
  RAW: "bg-indigo-500",
  primary: "bg-primary",
  gold: "bg-[#CBB590]",
  secondary: "bg-foreground-muted",
  outline: "bg-foreground-subtle",
  success: "bg-success",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "secondary",
  size = "md",
  dot = false,
  children,
  className,
  label,
  title,
  ...props
}) => {
  const isDietary = (v: string): v is DietaryTag => v in dietaryDescriptions;
  const computedDescription = isDietary(variant) ? dietaryDescriptions[variant] : label;
  const accessibleLabel = label || computedDescription || (typeof children === "string" ? children : undefined);
  const displayContent = children ?? (isDietary(variant) ? variant : null);

  return (
    <span
      role="status"
      aria-label={accessibleLabel}
      title={title || computedDescription}
      className={cn(
        "inline-flex items-center font-mono font-medium border rounded-full transition-colors select-none",
        size === "sm" ? "px-2 py-0.5 text-[10px] tracking-wider" : "px-2.5 py-1 text-xs tracking-normal",
        variantStyles[variant] || variantStyles.secondary,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5 shrink-0",
            dotColors[variant] || "bg-current"
          )}
          aria-hidden="true"
        />
      )}
      {displayContent}
    </span>
  );
};
