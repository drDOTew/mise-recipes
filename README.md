# Mise.

Tu recetario digital, siempre listo.

**Mise** (como *mise en place*) es una app web para crear, organizar y compartir recetas. Pensada para cocineros caseros que quieren tener su colección siempre a mano.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Formularios:** React Hook Form + Zod
- **Estado y datos:** TanStack Query
- **Auth:** Laravel Sanctum (token vía cookie)

## Funcionalidades

- Registro e inicio de sesión
- Dashboard con búsqueda y filtros por categoría
- Crear, editar y eliminar recetas
- Ingredientes, pasos, tags y selector de emoji
- Escalado de porciones
- Vista detalle con modo lectura
- Compartir receta (link público)
- Tags dinámicos desde el backend
- Sidebar responsive con navegación
- Cambio de contraseña

## Empezar

```bash
git clone https://github.com/drDOTew/mise-frontend
cd mise-frontend
npm install
```

Creá `.env.local`:

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

La app está deployada en Vercel. Solo conectá el repo y seteá `NEXT_PUBLIC_API_URL`.

## Licencia

MIT
