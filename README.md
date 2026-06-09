# Mise.

Tu recetario digital, siempre listo.

**Mise** (como *mise en place*) es una aplicación web para crear, organizar y compartir recetas. Diseñada para cocineros caseros que quieren tener su colección siempre a mano.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Formularios:** React Hook Form + Zod
- **Estado y datos:** TanStack Query
- **Auth:** Laravel Sanctum (token vía cookie)

## Funcionalidades

- Registro e inicio de sesión
- Dashboard con búsqueda y filtros
- Creación y edición de recetas con ingredientes, pasos, tags y emoji
- Escalado de porciones
- Vista detalle con modo lectura
- Compartir receta (link público)
- Tags dinámicos desde el backend
- Sidebar responsive con navegación

## Empezar

```bash
git clone https://github.com/drDOTew/mise-frontend
cd mise-frontend
npm install
```

Crear `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://tu-backend.com/api/v1
```

Desarrollo:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## Deploy

La app está deployada en Vercel. Solo conectar el repo y setear `NEXT_PUBLIC_API_URL`.

## Licencia

MIT
