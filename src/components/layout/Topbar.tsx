"use client";

interface TopbarProps {
  title: string;
  children?: React.ReactNode;
}

export function Topbar({ title, children }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="font-heading text-xl text-text-primary">{title}</h1>

        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </header>
  );
}