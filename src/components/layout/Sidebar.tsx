"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Mis recetas", icon: "📖" },
  { href: "/favorites", label: "Favoritas", icon: "❤️" },
  { href: "/collections", label: "Colecciones", icon: "📁" },
  { href: "/shopping-list", label: "Lista compras", icon: "🛒" },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-60 bg-surface border-r border-border flex flex-col",
          "transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link href="/dashboard" className="font-heading text-2xl text-text-primary">
            Mise<span className="text-accent">.</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent-bg text-accent"
                    : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                )}
                onClick={onClose}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Tags section placeholder */}
        <div className="px-4 py-2 border-t border-border">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
            Categorías
          </h3>
          <div className="flex flex-wrap gap-1">
            {["Italiana", "Argentina", "Rápidas"].map((tag) => (
              <Link
                key={tag}
                href={`/dashboard?tag=${tag}`}
                className="px-2 py-1 text-xs bg-gray-100 text-text-secondary rounded-full hover:bg-gray-200"
                onClick={onClose}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* User info */}
        {user && (
          <div className="p-4 border-t border-border flex items-center gap-3">
            <Avatar name={user.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
              <p className="text-xs text-text-muted capitalize">{user.plan}</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}