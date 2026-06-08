"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({ title, subtitle, backHref, backLabel = "Volver" }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {backLabel}
        </Link>
      )}
      <h1 className={cn("font-heading text-2xl text-text-primary", subtitle && "mb-1")}>
        {title}
      </h1>
      {subtitle && <p className="text-text-secondary">{subtitle}</p>}
    </div>
  );
}