"use client";

import { Topbar } from "@/components/layout/Topbar";

export default function ShoppingListPage() {
  return (
    <div>
      <Topbar title="Lista de compras" />

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-6">🛒</span>
        <h2 className="font-heading text-2xl text-text-primary mb-2">
          Próximamente
        </h2>
        <p className="text-text-secondary max-w-md">
          Generá automáticamente tu lista de compras a partir de las recetas. Muy pronto.
        </p>
      </div>
    </div>
  );
}
