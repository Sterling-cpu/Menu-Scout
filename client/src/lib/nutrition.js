// Fit score: higher is better for the user's goals.
// Rewards protein, penalizes sugar and calories relative to targets.
export function fitScore(item, profile) {
  if (!profile) return 0
  const cal = item.estimated_calories || 0
  const protein = item.protein_g || 0
  const sugar = item.sugar_g || 0

  let score = 0
  if (profile.proteinTargetG > 0) score += protein / profile.proteinTargetG
  if (profile.sugarLimitG > 0) score -= sugar / profile.sugarLimitG
  if (profile.calorieTarget > 0) score -= cal / profile.calorieTarget
  return score
}

export function hasAllergen(item, allergies) {
  if (!allergies?.length || !item.allergens?.length) return false
  const itemAllergens = item.allergens.map((a) => a.toLowerCase())
  return allergies.some((a) => itemAllergens.includes(a.toLowerCase()))
}

export function matchesFilters(item, filters) {
  if (!filters) return true
  if (filters.maxCal !== '' && (item.estimated_calories ?? Infinity) > Number(filters.maxCal)) return false
  if (filters.maxSugar !== '' && (item.sugar_g ?? Infinity) > Number(filters.maxSugar)) return false
  if (filters.maxCarbs !== '' && (item.carbs_g ?? Infinity) > Number(filters.maxCarbs)) return false
  if (filters.minProtein !== '' && (item.protein_g ?? -Infinity) < Number(filters.minProtein)) return false
  return true
}

export function dishSnapshot(item, restaurant) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    estimated_calories: item.estimated_calories,
    protein_g: item.protein_g,
    carbs_g: item.carbs_g,
    sugar_g: item.sugar_g,
    fat_g: item.fat_g,
    allergens: item.allergens || [],
    restaurantName: restaurant?.name || '',
    restaurantCuisine: restaurant?.cuisine || '',
  }
}

export async function shareDish(item, restaurantName) {
  const parts = [`${item.name} at ${restaurantName}`]
  const stats = []
  if (item.estimated_calories != null) stats.push(`~${item.estimated_calories} cal`)
  if (item.protein_g != null) stats.push(`${item.protein_g}g protein`)
  if (item.carbs_g != null) stats.push(`${item.carbs_g}g carbs`)
  if (item.sugar_g != null) stats.push(`${item.sugar_g}g sugar`)
  if (stats.length) parts.push(`(${stats.join(', ')} — est.)`)
  const text = parts.join(' ')

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Menu Scout', text })
      return 'shared'
    } catch {
      return 'cancelled'
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    return 'failed'
  }
}
