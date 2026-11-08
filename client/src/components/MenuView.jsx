import { useMemo, useState } from 'react'
import MenuItemCard from './MenuItemCard'
import { fitScore, hasAllergen, matchesFilters } from '../lib/nutrition'

const EMPTY_FILTERS = { maxCal: '', maxSugar: '', maxCarbs: '', minProtein: '', hideAllergens: true }

export default function MenuView({
  restaurant,
  items,
  loading,
  error,
  onBack,
  profile,
  favoriteIds,
  compareIds,
  onToggleFavorite,
  onToggleCompare,
  onShare,
  onViewCompare,
}) {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sortByFit, setSortByFit] = useState(false)

  const setFilter = (key) => (e) =>
    setFilters((f) => ({ ...f, [key]: e.target.value }))

  const { visible, recommended } = useMemo(() => {
    let list = items.filter((item) => matchesFilters(item, filters))
    if (filters.hideAllergens && profile?.allergies?.length) {
      list = list.filter((item) => !hasAllergen(item, profile.allergies))
    }

    const scored = list
      .map((item) => ({ item, score: fitScore(item, profile) }))
      .sort((a, b) => b.score - a.score)

    const recs = scored.filter((s) => s.score > 0).slice(0, 3).map((s) => s.item)

    if (sortByFit) {
      return { visible: scored.map((s) => s.item), recommended: recs }
    }
    return {
      visible: [...list].sort(
        (a, b) => (a.estimated_calories ?? Infinity) - (b.estimated_calories ?? Infinity)
      ),
      recommended: recs,
    }
  }, [items, filters, profile, sortByFit])

  const activeFilterCount = [
    filters.maxCal,
    filters.maxSugar,
    filters.maxCarbs,
    filters.minProtein,
  ].filter((v) => v !== '').length

  return (
    <section>
      <button className="back-button" onClick={onBack}>← All restaurants</button>
      <h2 className="menu-title">{restaurant.name}</h2>
      <p className="menu-subtitle">
        {restaurant.cuisine}
        {restaurant.address ? ` · ${restaurant.address}` : ''}
      </p>

      <div className="filter-bar">
        <div className="filter-grid">
          <label className="field compact">
            <span>Max cal</span>
            <input type="number" min="0" placeholder="—" value={filters.maxCal} onChange={setFilter('maxCal')} />
          </label>
          <label className="field compact">
            <span>Max sugar</span>
            <input type="number" min="0" placeholder="—" value={filters.maxSugar} onChange={setFilter('maxSugar')} />
          </label>
          <label className="field compact">
            <span>Max carbs</span>
            <input type="number" min="0" placeholder="—" value={filters.maxCarbs} onChange={setFilter('maxCarbs')} />
          </label>
          <label className="field compact">
            <span>Min protein</span>
            <input type="number" min="0" placeholder="—" value={filters.minProtein} onChange={setFilter('minProtein')} />
          </label>
        </div>
        <div className="filter-toggles">
          <label className="toggle">
            <input
              type="checkbox"
              checked={filters.hideAllergens}
              onChange={(e) => setFilters((f) => ({ ...f, hideAllergens: e.target.checked }))}
            />
            Hide my allergens
          </label>
          <label className="toggle">
            <input type="checkbox" checked={sortByFit} onChange={(e) => setSortByFit(e.target.checked)} />
            Sort by goal fit
          </label>
          {(activeFilterCount > 0 || !filters.hideAllergens || sortByFit) && (
            <button className="link-button" onClick={() => { setFilters(EMPTY_FILTERS); setSortByFit(false) }}>
              Reset
            </button>
          )}
        </div>
      </div>

      {loading && <p className="status">Loading menu…</p>}
      {error && <p className="status error">Couldn't load menu: {error}</p>}

      {!loading && !error && (
        <>
          {recommended.length > 0 && !sortByFit && (
            <div className="recommended-section">
              <h3 className="subsection-title">Recommended for you</h3>
              <div className="menu-list">
                {recommended.map((item) => (
                  <MenuItemCard
                    key={`rec-${item.id}`}
                    item={item}
                    restaurantName={restaurant.name}
                    isFavorite={favoriteIds.has(item.id)}
                    inCompare={compareIds.has(item.id)}
                    onFavorite={onToggleFavorite}
                    onCompare={onToggleCompare}
                    onShare={onShare}
                  />
                ))}
              </div>
            </div>
          )}

          <h3 className="subsection-title">
            Menu {visible.length !== items.length && `(${visible.length} of ${items.length})`}
          </h3>
          <div className="menu-list">
            {visible.length === 0 && (
              <p className="status">No dishes match your filters. Try resetting.</p>
            )}
            {visible.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                restaurantName={restaurant.name}
                isFavorite={favoriteIds.has(item.id)}
                inCompare={compareIds.has(item.id)}
                onFavorite={onToggleFavorite}
                onCompare={onToggleCompare}
                onShare={onShare}
              />
            ))}
          </div>
        </>
      )}

      {compareIds.size > 0 && (
        <button className="compare-bar" onClick={onViewCompare}>
          Compare ({compareIds.size}/3) →
        </button>
      )}
    </section>
  )
}
