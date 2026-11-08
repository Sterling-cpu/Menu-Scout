export default function MenuItemCard({
  item,
  restaurantName,
  isFavorite,
  inCompare,
  onFavorite,
  onCompare,
  onShare,
}) {
  return (
    <article className="menu-item-card">
      <div className="item-header">
        <h3>{item.name}</h3>
        <div className="item-actions">
          {onShare && (
            <button className="icon-button" title="Share dish" onClick={() => onShare(item)}>
              ↗
            </button>
          )}
          {onCompare && (
            <button
              className={`icon-button ${inCompare ? 'active' : ''}`}
              title="Add to compare"
              onClick={() => onCompare(item)}
            >
              ⇄
            </button>
          )}
          {onFavorite && (
            <button
              className={`icon-button ${isFavorite ? 'favorite-active' : ''}`}
              title="Save favorite"
              onClick={() => onFavorite(item)}
            >
              ♥
            </button>
          )}
        </div>
      </div>

      {item.description && <p className="item-description">{item.description}</p>}
      {restaurantName && <p className="item-restaurant">{restaurantName}</p>}

      <div className="nutrition-row">
        {item.estimated_calories != null && (
          <span className="nutrition-badge"><strong>{item.estimated_calories}</strong> cal</span>
        )}
        {item.protein_g != null && (
          <span className="nutrition-badge"><strong>{item.protein_g}g</strong> protein</span>
        )}
        {item.carbs_g != null && (
          <span className="nutrition-badge"><strong>{item.carbs_g}g</strong> carbs</span>
        )}
        {item.sugar_g != null && (
          <span className="nutrition-badge"><strong>{item.sugar_g}g</strong> sugar</span>
        )}
        {item.fat_g != null && (
          <span className="nutrition-badge"><strong>{item.fat_g}g</strong> fat</span>
        )}
      </div>

      <p className="estimate-note">Estimated values</p>

      {item.allergens?.length > 0 && (
        <div className="allergen-row">
          {item.allergens.map((a) => (
            <span key={a} className="allergen-chip">{a}</span>
          ))}
        </div>
      )}
    </article>
  )
}
