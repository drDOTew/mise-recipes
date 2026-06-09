"use client";

import { Topbar } from "@/components/layout/Topbar";

export default function FavoritesPage() {
  return (
    <div>
      <Topbar title="Favoritas" />

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-6">💛</span>
        <h2 className="font-heading text-2xl text-text-primary mb-2">
          Próximamente
        </h2>
        <p className="text-text-secondary max-w-md">
          Estamos trabajando para traerte esta función. Muy pronto vas a poder
          guardar y organizar tus recetas favoritas en un solo lugar.
        </p>
      </div>
    </div>
  );
}
