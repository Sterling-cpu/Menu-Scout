const NUTRIENTS = [
  { key: 'estimated_calories', label: 'Calories', unit: '', best: 'min' },
  { key: 'protein_g', label: 'Protein (g)', unit: 'g', best: 'max' },
  { key: 'carbs_g', label: 'Carbs (g)', unit: 'g', best: 'min' },
  { key: 'sugar_g', label: 'Sugar (g)', unit: 'g', best: 'min' },
  { key: 'fat_g', label: 'Fat (g)', unit: 'g', best: 'min' },
]

function bestValue(items, key, direction) {
  const values = items.map((i) => i[key]).filter((v) => v != null)
  if (!values.length) return null
  return direction === 'min' ? Math.min(...values) : Math.max(...values)
}

export default function CompareView({ items, onRemove, onClear, onBack }) {
  if (!items.length) {
    return (
      <section>
        <button className="back-button" onClick={onBack}>← Back</button>
        <p className="status">No dishes selected. Tap "Compare" on dishes to add them here.</p>
      </section>
    )
  }

  return (
    <section>
      <button className="back-button" onClick={onBack}>← Back</button>
      <h2 className="section-title">Compare dishes</h2>
      <p className="hint">All values are estimates. Best value per row is highlighted.</p>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th></th>
              {items.map((item) => (
                <th key={item.id}>
                  <div className="compare-dish-name">{item.name}</div>
                  <div className="compare-restaurant">{item.restaurantName}</div>
                  <button className="link-button danger" onClick={() => onRemove(item.id)}>
                    remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {NUTRIENTS.map((n) => {
              const best = bestValue(items, n.key, n.best)
              return (
                <tr key={n.key}>
                  <td className="compare-label">{n.label}</td>
                  {items.map((item) => (
                    <td
                      key={item.id}
                      className={item[n.key] != null && item[n.key] === best ? 'compare-best' : ''}
                    >
                      {item[n.key] != null ? `${item[n.key]}${n.unit}` : '—'}
                    </td>
                  ))}
                </tr>
              )
            })}
            <tr>
              <td className="compare-label">Allergens</td>
              {items.map((item) => (
                <td key={item.id} className="compare-allergens">
                  {item.allergens?.length ? item.allergens.join(', ') : 'none listed'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {items.length < 3 && <p className="hint">Add up to {3 - items.length} more dish(es) to compare.</p>}
      <button className="secondary-button" onClick={onClear}>Clear comparison</button>
    </section>
  )
}
