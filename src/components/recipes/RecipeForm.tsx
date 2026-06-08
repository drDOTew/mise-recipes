"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipeSchema } from "@/schemas/recipe";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { DIFFICULTIES, UNITS, RECIPE_EMOJIS } from "@/lib/constants";
import type { RecipePayload, Recipe } from "@/lib/types";
import { useState } from "react";
import { useTags } from "@/hooks/useTags";

interface RecipeFormProps {
  initialValues?: Partial<Recipe>;
  onSubmit: (data: RecipePayload) => Promise<void>;
  isLoading?: boolean;
}

export function RecipeForm({ initialValues, onSubmit, isLoading }: RecipeFormProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("🍝");
  const { list: tagsQuery, create: createTag } = useTags();
  const [newTagName, setNewTagName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RecipePayload>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      servings: initialValues?.servings || 4,
      prep_time_minutes: initialValues?.prep_time_minutes || null,
      cook_time_minutes: initialValues?.cook_time_minutes || null,
      difficulty: initialValues?.difficulty || null,
      source_url: initialValues?.source_url || null,
      ingredients:
        initialValues?.ingredients?.map((ing) => ({
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          sort_order: ing.sort_order,
        })) || [],
      steps:
        initialValues?.steps?.map((step) => ({
          body: step.body,
          sort_order: step.sort_order,
        })) || [],
      tag_ids: initialValues?.tags?.map((t) => t.id) || [],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const watchedTagIds = watch("tag_ids") || [];
  const tags = tagsQuery.data || [];

  const toggleTag = (tagId: number) => {
    const current = watchedTagIds;
    if (current.includes(tagId)) {
      setValue("tag_ids", current.filter((id) => id !== tagId));
    } else {
      setValue("tag_ids", [...current, tagId]);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    setIsCreatingTag(true);
    try {
      const newTag = await createTag.mutateAsync(newTagName.trim());
      setValue("tag_ids", [...watchedTagIds, newTag.id]);
      setNewTagName("");
    } catch {
      alert("Error al crear tag");
    } finally {
      setIsCreatingTag(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <Input
        label="Nombre *"
        placeholder="Pasta alla Norma"
        error={errors.title?.message}
        {...register("title")}
      />

      {/* Description */}
      <Textarea
        label="Descripción"
        placeholder="Una breve descripción de tu receta..."
        error={errors.description?.message}
        {...register("description")}
      />

      {/* Times and servings */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Input
          label="Prep (min)"
          type="number"
          placeholder="20"
          {...register("prep_time_minutes", { valueAsNumber: true })}
        />
        <Input
          label="Cocción (min)"
          type="number"
          placeholder="15"
          {...register("cook_time_minutes", { valueAsNumber: true })}
        />
        <Input
          label="Porciones *"
          type="number"
          min="1"
          max="99"
          placeholder="4"
          error={errors.servings?.message}
          {...register("servings", { valueAsNumber: true })}
        />
        <Select
          label="Dificultad"
          options={DIFFICULTIES.map((d) => ({ value: d.value, label: d.label }))}
          placeholder="Seleccionar"
          {...register("difficulty")}
        />
      </div>

      {/* Emoji selector - display only, backend MVP does not support emoji field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Emoji <span className="text-text-muted text-xs">(solo visual)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {RECIPE_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-colors ${
                selectedEmoji === emoji
                  ? "bg-accent-bg ring-2 ring-accent"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <h3 className="font-heading text-lg mb-3">Ingredientes</h3>
        <div className="space-y-2">
          {ingredientFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <Input
                placeholder="Ingrediente"
                className="flex-1"
                error={errors.ingredients?.[index]?.name?.message}
                {...register(`ingredients.${index}.name`)}
              />
              <Input
                placeholder="Cantidad"
                className="w-20"
                {...register(`ingredients.${index}.quantity`)}
              />
              <Select
                options={UNITS.map((u) => ({ value: u.value, label: u.label }))}
                placeholder="Ud"
                className="w-24"
                {...register(`ingredients.${index}.unit`)}
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
                aria-label="Remove ingredient"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-2"
          onClick={() => appendIngredient({ name: "", quantity: "", unit: null, sort_order: ingredientFields.length })}
        >
          + Agregar ingrediente
        </Button>
      </div>

      {/* Steps */}
      <div>
        <h3 className="font-heading text-lg mb-3">Pasos</h3>
        <div className="space-y-3">
          {stepFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-2">
                {index + 1}
              </span>
              <Textarea
                placeholder="Describí el paso..."
                autoGrow
                className="flex-1"
                error={errors.steps?.[index]?.body?.message}
                {...register(`steps.${index}.body`)}
              />
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
                aria-label="Remove step"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-2"
          onClick={() => appendStep({ body: "", sort_order: stepFields.length })}
        >
          + Agregar paso
        </Button>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-heading text-lg mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                watchedTagIds.includes(tag.id)
                  ? "bg-accent text-white"
                  : "bg-accent-bg text-accent hover:bg-accent hover:text-white"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Nuevo tag..."
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCreateTag();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleCreateTag}
            isLoading={isCreatingTag}
          >
            Crear
          </Button>
        </div>
      </div>

      {/* Source URL */}
      <Input
        label="URL de origen"
        type="url"
        placeholder="https://..."
        error={errors.source_url?.message}
        {...register("source_url")}
      />

      {/* Submit */}
      <div className="flex gap-3">
        <Button type="submit" variant="accent" isLoading={isLoading} className="flex-1">
          💾 Guardar receta
        </Button>
      </div>
    </form>
  );
}
