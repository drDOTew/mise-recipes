"use client";

import { useSidebar } from "@/providers/SidebarProvider";

interface TopbarProps {
  title: string;
  children?: React.ReactNode;
}

export function Topbar({ title, children }: TopbarProps) {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="lg:hidden p-1 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="font-heading text-xl text-text-primary">{title}</h1>
        </div>

        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </header>
  );
}