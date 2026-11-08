# Menu Scout — Product Requirements Document

## Project title and description

**Menu Scout** is a mobile-first web application (PWA) that helps people make
informed food choices when eating at restaurants. Many restaurant menus lack
detailed nutritional information, making it hard for people with fitness goals,
food allergies, or health conditions to choose meals that fit their needs.

Menu Scout lets users photograph restaurant menus to view estimated nutritional
information (calories, protein, carbohydrates, sugar, fat), set dietary goals
and allergies in a profile, receive dish recommendations and filters, compare
dishes side by side, and save or share favorites. Unlike apps such as
MyFitnessPal, Menu Scout analyzes real restaurant menus rather than requiring
manual food-database searches.

## Target users

- Fitness-focused younger adults and working professionals (e.g., Mia Alvarez,
  training for a half marathon, wants high-protein / lower-carb meals)
- Older adults managing health conditions (e.g., Robert Chen, type 2 diabetes,
  needs lower sugar/carb options)
- College students, parents managing family dietary needs, and anyone tracking
  calories or macros while dining out

## Usage context

- Primarily smartphones, while dining at restaurants, cafés, and food
  establishments
- Quick decisions during lunch breaks or at unfamiliar restaurants
- Requires a smartphone camera and internet connection
- Must work well under variable restaurant lighting and menu readability

## Technical architecture

| Layer      | Technology                              | Notes                                   |
|------------|-----------------------------------------|-----------------------------------------|
| Frontend   | React 19 + Vite, PWA (vite-plugin-pwa)  | Mobile-first, installable, offline shell|
| Backend    | Node.js + Express 4                     | REST API under `/api`                   |
| Database   | Supabase (Postgres)                     | Auth, row-level security, SQL migrations|
| Camera     | Browser `getUserMedia` (future)         | Deferred to a later milestone           |

### Constraints

- Monorepo layout: `/client`, `/api`, `/supabase`, `/docs`
- Vite dev server proxies `/api` to `http://localhost:4000`
- All nutrition values are **estimates** — UI must label them as such
- No real OCR/vision integration yet; menu scanning is stubbed for a later
  milestone

## Scope (Level 1 user stories)

1. Scan Restaurant Menu — photo → nutritional estimates (stubbed)
2. Set Dietary Goals — profile stores calorie/macro targets
3. Record Food Allergies — profile stores allergens + severity
4. View Recommended Dishes — dishes ranked against profile goals
5. Filter Menu Items — filter by sugar/carbs/calories/etc.
6. Compare Menu Dishes — side-by-side nutrition comparison
7. Save Favorite Dishes — per-user favorites
8. Share Dishes — shareable dish recommendations
9. Discover Nearby Restaurants — browse nearby restaurants

Out of scope for Level 1: real OCR/AI menu scanning, payment/ordering
integration, restaurant-owner dashboards.

## Milestones (suggested)

1. **Scaffold** (this deliverable) — repo structure, docs, DB schema
2. **Profile & auth** — sign-up/login, dietary goals, allergies (US2, US3)
3. **Menu browsing** — restaurants + menu items, recommendations, filters,
   compare (US4, US5, US6, US9)
4. **Engagement** — favorites, sharing, meal tracking (US7, US8)
5. **Scanning** — camera capture + OCR/vision pipeline (US1)
