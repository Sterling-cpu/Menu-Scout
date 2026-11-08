# Menu Scout — Task List

Tasks are grouped by milestone and mapped to the Level 1 user stories from the
PRD. Each task lists its acceptance criteria ("done" means all criteria pass).

## Milestone 0 — Scaffold (this deliverable)

- [x] Create repo structure (`/client`, `/api`, `/supabase`, `/docs`)
- [x] Scaffold React PWA client with Vite
- [x] Scaffold Express API with health endpoint
- [x] Create Supabase schema migration + seed data
- [x] Write PRD, task list, and workspace rules

## Milestone 1 — Auth & Profile (US2, US3)

### T1.1 Supabase Auth integration
- **Story:** Foundation for all user-specific features
- **Description:** Add Supabase Auth (email/password) to the client; protect API routes
- **Acceptance criteria:**
  - User can sign up and log in from the client
  - Session persists across page reloads
  - Logged-out users are redirected to login for protected pages
  - API endpoints reject unauthenticated requests where required

### T1.2 Profile setup — dietary goals
- **Story:** US2 — Set Dietary Goals
- **Description:** Profile form to enter calorie target, protein target, carb target, sugar limit, and dietary notes
- **Acceptance criteria:**
  - Logged-in user can create and edit their profile
  - Values persist in `profiles` table after reload
  - Validation rejects negative numbers and impossible values (e.g., sugar limit > carb target warns)

### T1.3 Record food allergies
- **Story:** US3 — Record Food Allergies
- **Description:** UI to add/remove allergens (e.g., peanuts, shellfish, gluten, dairy, soy, eggs, fish, sesame, tree nuts) with severity (mild/moderate/severe)
- **Acceptance criteria:**
  - User can add multiple allergies with a severity each
  - Allergies persist and are listed on the profile page
  - User can remove an allergy

## Milestone 2 — Menu Browsing (US4, US5, US6, US9)

### T2.1 Restaurant discovery
- **Story:** US9 — Discover Nearby Restaurants
- **Description:** List nearby restaurants from the `restaurants` table (initially by distance/browse; real geolocation later)
- **Acceptance criteria:**
  - User sees a list of restaurants with name, cuisine, address
  - Tapping a restaurant shows its menu items
  - Empty state shown when no restaurants exist

### T2.2 Menu item display with estimates
- **Story:** US4 — View Recommended Dishes
- **Description:** Show menu items with estimated calories, protein, carbs, sugar, fat; label all values as estimates
- **Acceptance criteria:**
  - Each dish shows all five nutrition values or "unknown" where missing
  - UI clearly labels values as estimates
  - Items are sorted/ranked by fit to the user's goals when a profile exists

### T2.3 Filter menu items
- **Story:** US5 — Filter Menu Items
- **Description:** Filter controls for max calories, max sugar, max carbs, min protein, and allergen exclusion
- **Acceptance criteria:**
  - Filters update the visible list immediately
  - Allergen filter hides items containing the user's recorded allergens
  - "Clear filters" resets all controls

### T2.4 Compare dishes side by side
- **Story:** US6 — Compare Menu Dishes
- **Description:** Select 2–3 dishes to view nutrition values side by side
- **Acceptance criteria:**
  - User can select up to 3 dishes from a menu
  - Comparison view shows each nutrient in aligned columns
  - Best value per nutrient is visually highlighted

## Milestone 3 — Engagement (US7, US8)

### T3.1 Save favorite dishes
- **Story:** US7 — Save Favorite Dishes
- **Description:** Heart/save button on dishes; favorites list on profile
- **Acceptance criteria:**
  - Saving a dish adds it to `favorites`
  - Favorites are visible on a dedicated page
  - Un-saving removes it; state persists across sessions

### T3.2 Share dish recommendations
- **Story:** US8 — Share Dishes
- **Description:** Generate a shareable link/token for a dish; view shared dish page
- **Acceptance criteria:**
  - User can create a share link for any dish
  - Opening the link shows dish + restaurant info (no login required)
  - Owner can see their sent shares on their profile

## Milestone 4 — Menu Scanning (US1)

### T4.1 Camera capture
- **Story:** US1 — Scan Restaurant Menu
- **Description:** Camera capture UI using `getUserMedia`; capture/retake/upload flow
- **Acceptance criteria:**
  - User can take a photo or upload an image on mobile browsers
  - Image is stored (Supabase Storage) and linked to a `menu_scans` row
  - Permission-denied state shows helpful instructions

### T4.2 Menu OCR / nutrition estimation
- **Story:** US1 — Scan Restaurant Menu
- **Description:** Extract menu items and estimate nutrition (vision LLM or OCR + food DB)
- **Acceptance criteria:**
  - Scanned menu produces a list of items with estimated nutrition
  - Estimates are labeled as estimates; low-confidence items flagged
  - Results feed into the same recommendation/filter UI as manual menus
