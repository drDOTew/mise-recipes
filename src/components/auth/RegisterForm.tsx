"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerSchema } from "@/schemas/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import type { RegisterPayload } from "@/lib/types";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      setError(null);
      await registerUser(data);
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { message?: string; errors?: Record<string, string[]> };
      if (error.errors?.email) {
        setError("Este email ya está registrado");
      } else {
        setError(error.message || "Error al crear la cuenta");
      }
    }
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-text-primary">
          Mise<span className="text-accent">.</span>
        </h1>
        <p className="text-text-secondary mt-1">Tu recetario digital, siempre listo</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Input
          label="Nombre"
          type="text"
          placeholder="Andrés"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="andres@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          hint="Mínimo 8 caracteres"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
        />

        <Button type="submit" variant="accent" className="w-full" isLoading={isSubmitting}>
          Crear cuenta
        </Button>

        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-border w-full" />
          <span className="bg-bg px-4 text-sm text-text-muted absolute">o</span>
        </div>

        <Button type="button" variant="outline" className="w-full" disabled>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuar con Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        ¿Ya tenés cuenta?{" "}
        <a href="/login" className="text-accent hover:underline font-medium">
          Iniciar sesión
        </a>
      </p>
    </div>
  );
}