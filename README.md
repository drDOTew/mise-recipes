# Mise.

Your digital cookbook, always ready.

**Mise** (as in *mise en place*) is a web app to create, organize, and share recipes. Built for home cooks who want their collection at hand, wherever they are.

> 🎯 **Live demo:** [mise-frontend-wine.vercel.app](https://mise-frontend-wine.vercel.app)

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **State & Data:** TanStack Query
- **Auth:** Laravel Sanctum (token via cookie)

## Features

- Sign up & sign in
- Dashboard with search and category filters
- Create, edit, and delete recipes
- Ingredients, steps, tags, and emoji picker
- Serving scaling
- Detail view with reading mode
- Share recipe (public link)
- Dynamic tags from the backend
- Responsive sidebar navigation
- Password change

## Getting started

```bash
git clone https://github.com/drDOTew/mise-recipes
cd mise-frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.com/api/v1
```

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## Deploy

The app is deployed on Vercel. Just connect the repo and set `NEXT_PUBLIC_API_URL` as an environment variable.

## License

MIT
