function NutritionBadge({ label, value, unit }) {
  if (value == null) return null
  return (
    <span className="nutrition-badge">
      <strong>{value}</strong>
      <span className="nutrition-unit">{unit}</span> {label}
    </span>
  )
}

export default function MenuItemCard({ item }) {
  return (
    <article className="menu-item-card">
      <h3>{item.name}</h3>
      {item.description && <p className="item-description">{item.description}</p>}

      <div className="nutrition-row">
        <NutritionBadge label="cal" value={item.estimated_calories} unit="" />
        <NutritionBadge label="protein" value={item.protein_g} unit="g" />
        <NutritionBadge label="carbs" value={item.carbs_g} unit="g" />
        <NutritionBadge label="sugar" value={item.sugar_g} unit="g" />
        <NutritionBadge label="fat" value={item.fat_g} unit="g" />
      </div>

      <p className="estimate-note">Estimated values</p>

      {item.allergens?.length > 0 && (
        <div className="allergen-row">
          {item.allergens.map((a) => (
            <span key={a} className="allergen-chip">
              {a}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
