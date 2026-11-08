import MenuItemCard from './MenuItemCard'

export default function MenuView({ restaurant, items, loading, error, onBack }) {
  return (
    <section>
      <button className="back-button" onClick={onBack}>
        ← All restaurants
      </button>
      <h2 className="menu-title">{restaurant.name}</h2>
      <p className="menu-subtitle">
        {restaurant.cuisine}
        {restaurant.address ? ` · ${restaurant.address}` : ''}
      </p>

      {loading && <p className="status">Loading menu…</p>}
      {error && <p className="status error">Couldn't load menu: {error}</p>}

      {!loading && !error && (
        <div className="menu-list">
          {items.length === 0 && <p className="status">No menu items yet.</p>}
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
