"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  greeting?: string;
}

export function AuthLayout({ children, greeting = "La cocina es amor hecho visible" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-2/5 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">{children}</div>
      </div>

      {/* Right side - Visual (desktop only) */}
      <div className="hidden lg:flex lg:w-3/5 bg-accent-bg items-center justify-center p-12">
        <div className="text-center">
          <p className="font-heading text-3xl text-text-primary italic mb-12">
            &ldquo;{greeting}&rdquo;
          </p>
          <div className="flex gap-4 justify-center">
            {/* Mini recipe cards for visual interest */}
            <RecipePreview emoji="🍝" title="Pasta alla Norma" />
            <RecipePreview emoji="🥗" title="Ensalada César" className="mt-8" />
            <RecipePreview emoji="🍰" title="Tiramisu" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipePreview({ emoji, title, className }: { emoji: string; title: string; className?: string }) {
  return (
    <div
      className={cn(
        "w-32 h-40 bg-surface rounded-lg border border-border p-4 flex flex-col items-center justify-center shadow-sm",
        className
      )}
    >
      <span className="text-4xl mb-2">{emoji}</span>
      <span className="text-sm text-text-secondary text-center font-heading">{title}</span>
    </div>
  );
}