"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterPill } from "@/components/ui/FilterPill";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { Button } from "@/components/ui/Button";
import { useRecipes } from "@/hooks/useRecipes";
import { Spinner } from "@/components/ui/Spinner";

const categories = ["Todas", "Rápidas", "Vegetarianas", "Argentinas", "Postres"];

export default function DashboardPage() {
  const router = useRouter();
  const { infiniteList } = useRecipes();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Collect all recipes from all pages
  const allRecipes = infiniteList.data?.pages.flatMap((page) => page.data) || [];

  const filteredRecipes = allRecipes.filter((recipe) => {
    // Category filter
    if (activeCategory !== "Todas") {
      const hasTag = recipe.tags.some((t) => t.name === activeCategory);
      if (!hasTag) return false;
    }
    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      return (
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(searchLower)) ||
        recipe.tags.some((t) => t.name.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  return (
    <div>
      <Topbar title="Mis recetas">
        <Button onClick={() => router.push("/recipes/new")}>Nueva receta</Button>
      </Topbar>

      {/* Search and filters */}
      <div className="space-y-4 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nombre, ingrediente o tag..."
          onClear={() => setSearch("")}
        />
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <FilterPill
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      </div>

      {/* Recipe grid */}
      <RecipeGrid
        recipes={filteredRecipes}
        isLoading={infiniteList.isLoading}
        onAddClick={() => router.push("/recipes/new")}
      />

      {/* Load more */}
      {infiniteList.hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => infiniteList.fetchNextPage()}
            isLoading={infiniteList.isFetchingNextPage}
          >
            Cargar más recetas
          </Button>
        </div>
      )}

      {/* Loading indicator for initial load */}
      {infiniteList.isLoading && (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
