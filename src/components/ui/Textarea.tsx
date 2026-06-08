import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  autoGrow?: boolean;
  maxHeight?: number;
}

export function Textarea({
  label,
  error,
  autoGrow = false,
  maxHeight = 200,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const handleAutoGrow = () => {
    const textarea = textareaRef.current;
    if (textarea && autoGrow) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    handleAutoGrow();
  }, [props.value]);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        id={textareaId}
        className={cn(
          "w-full px-3 py-2.5 rounded-[9px] bg-surface border text-text-primary placeholder:text-text-muted",
          "transition-colors duration-150 resize-none",
          "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
          "disabled:bg-gray-100 disabled:text-text-disabled disabled:cursor-not-allowed",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-border-light",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        onInput={autoGrow ? handleAutoGrow : undefined}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}