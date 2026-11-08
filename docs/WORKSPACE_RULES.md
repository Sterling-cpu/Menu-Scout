# Menu Scout — Workspace Rules

Rules for how we write code, name things, commit, and review changes.

## Naming conventions

- **Files/folders:** `kebab-case` for new files and folders
  (e.g., `menu-item-card.jsx`, `use-profile.js`)
- **React components:** `PascalCase` (e.g., `MenuItemCard.jsx`)
- **Variables/functions:** `camelCase` (e.g., `estimatedCalories`)
- **Constants:** `SCREAMING_SNAKE_CASE` for true constants only
- **Database tables/columns:** `snake_case` (e.g., `menu_items`, `created_at`)
- **API routes:** kebab-case, plural nouns (e.g., `/api/menu-items`, `/api/restaurants`)
- **Git branches:** `type/short-description` (see branching below)
- **Commits:** imperative mood, concise (see commit guidelines)

## Commit message guidelines

Format: `type(scope): short description`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:

```
feat(client): add profile dietary goals form
fix(api): handle missing supabase env vars
docs: update task list acceptance criteria
```

- Keep the subject line under 72 characters
- Explain *why* in the body when the change isn't obvious
- One logical change per commit when practical

## Branching strategy

- `main` is always deployable; never commit directly to `main`
- Branch naming: `feat/…`, `fix/…`, `docs/…`, `chore/…`
  - `feat/profile-goals`, `fix/allergen-filter`, `docs/prd-updates`
- Keep branches short-lived; rebase or merge `main` frequently
- Delete branches after merge

## Pull request & review process

1. Push your branch and open a PR against `main`
2. Fill in the PR template/description: what changed, why, how to test
3. At least one teammate must approve before merge
4. Resolve all review comments or reply explaining why not
5. Squash-merge small PRs; merge commits for larger features are fine
6. After merge, pull `main` and delete your local branch

## Environment & secrets

- Never commit `.env` files or API keys — use `.env.example` as a template
- Each developer keeps their own Supabase project or shares dev keys securely
- Run `npm install` in both `client/` and `api/` after pulling changes

## Definition of done (per task)

A task is done when:

- All acceptance criteria in `docs/TASKS.md` are met
- Code builds without errors (`npm run build` in `client/`, API starts cleanly)
- Changes are reviewed and merged via PR
- Relevant docs are updated if behavior or setup changed
