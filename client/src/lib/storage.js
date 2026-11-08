const PROFILE_KEY = 'menuscout.profile'
const FAVORITES_KEY = 'menuscout.favorites'

export const ALLERGENS = [
  'peanuts',
  'tree nuts',
  'shellfish',
  'fish',
  'eggs',
  'dairy',
  'soy',
  'gluten',
  'sesame',
  'mustard',
]

export const defaultProfile = {
  calorieTarget: 2000,
  proteinTargetG: 150,
  carbTargetG: 200,
  sugarLimitG: 50,
  allergies: [],
}

export function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY))
    return saved ? { ...defaultProfile, ...saved } : { ...defaultProfile }
  } catch {
    return { ...defaultProfile }
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []
  } catch {
    return []
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}
