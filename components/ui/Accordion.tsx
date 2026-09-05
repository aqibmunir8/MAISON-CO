"use client";

import React, { createContext, useContext, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
  variant?: "chevron" | "plus-minus";
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an <Accordion />");
  }
  return context;
}

export interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string[]) => void;
  variant?: "chevron" | "plus-minus";
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  type = "single",
  defaultValue,
  value,
  onValueChange,
  variant = "chevron",
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const isControlled = value !== undefined;
  const currentOpenItems = isControlled
    ? Array.isArray(value)
      ? value
      : [value]
    : internalValue;

  const toggleItem = (id: string) => {
    let next: string[];
    if (type === "single") {
      next = currentOpenItems.includes(id) ? [] : [id];
    } else {
      next = currentOpenItems.includes(id)
        ? currentOpenItems.filter((item) => item !== id)
        : [...currentOpenItems, id];
    }

    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <AccordionContext.Provider
      value={{ openItems: currentOpenItems, toggleItem, variant }}
    >
      <div className={cn("divide-y divide-border border-y border-border", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const ItemContext = createContext<{ value: string; disabled?: boolean } | null>(null);

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  className,
  disabled = false,
}) => {
  return (
    <ItemContext.Provider value={{ value, disabled }}>
      <div className={cn("group", className)}>{children}</div>
    </ItemContext.Provider>
  );
};

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  ...props
}) => {
  const { openItems, toggleItem, variant } = useAccordion();
  const item = useContext(ItemContext);
  const reactId = useId();

  if (!item) {
    throw new Error("<AccordionTrigger> must be within <AccordionItem>");
  }

  const isOpen = openItems.includes(item.value);
  const contentId = `accordion-content-${reactId}`;
  const triggerId = `accordion-trigger-${reactId}`;

  return (
    <h3>
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={item.disabled}
        onClick={() => toggleItem(item.value)}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left font-display text-base md:text-lg font-medium text-foreground transition-all duration-200",
          "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          isOpen && "text-primary",
          className
        )}
        {...props}
      >
        <span className="pr-4">{children}</span>
        <span className="shrink-0 text-foreground-subtle transition-transform duration-200">
          {variant === "chevron" ? (
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-300 ease-out",
                isOpen && "rotate-180 text-primary"
              )}
            />
          ) : isOpen ? (
            <Minus className="h-5 w-5 text-primary" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </span>
      </button>
    </h3>
  );
};

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
}) => {
  const { openItems } = useAccordion();
  const item = useContext(ItemContext);
  const reactId = useId();

  if (!item) {
    throw new Error("<AccordionContent> must be within <AccordionItem>");
  }

  const isOpen = openItems.includes(item.value);
  const contentId = `accordion-content-${reactId}`;
  const triggerId = `accordion-trigger-${reactId}`;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, delay: 0.05 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.15 },
            },
          }}
          className="overflow-hidden"
        >
          <div className={cn("pb-5 pt-1 text-sm text-foreground-muted leading-relaxed font-sans", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
