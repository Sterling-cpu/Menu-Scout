# Menu Scout

A mobile-first web app that helps people make informed food choices at restaurants.
Users scan (or browse) restaurant menus to see estimated nutritional information,
set dietary goals and allergies, get dish recommendations, compare options, and
save or share favorites.

## Repository layout

```
/client/    React PWA (Vite) — mobile-first frontend
/api/       Express API (Node) — backend endpoints, Supabase client
/supabase/  SQL migrations + seed data
/docs/      PRD, task list, OpenAPI notes, deployment notes
```

## Getting started

### Prerequisites

- Node.js 20+ and npm
- A Supabase project (free tier works)

### 1. Client

```bash
cd client
npm install
npm run dev
```

Runs at http://localhost:5173 and proxies `/api` requests to the Express server.

### 2. API

```bash
cd api
npm install
cp .env.example .env   # fill in your Supabase keys
npm run dev
```

Runs at http://localhost:4000. `GET /api/health` returns `{"status":"ok"}`.

### 3. Database

1. Create a project at https://supabase.com
2. In the SQL editor, run `supabase/migrations/0001_init_schema.sql`
3. Optionally run `supabase/seeds/seed.sql` for sample restaurants and menu items
4. Copy the project URL and anon key into `api/.env`

## Scripts

| Location | Command        | Purpose              |
|----------|----------------|----------------------|
| client   | `npm run dev`  | Vite dev server      |
| client   | `npm run build`| Production build     |
| api      | `npm run dev`  | API with file watch  |
| api      | `npm start`    | API production mode  |

## Team workflow

See `docs/WORKSPACE_RULES.md` for branching, commit, and PR conventions.
See `docs/TASKS.md` for the development task breakdown.
See `docs/PRD.md` for the product requirements.
