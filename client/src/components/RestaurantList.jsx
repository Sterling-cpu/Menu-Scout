export default function RestaurantList({ restaurants, onSelect, loading, error }) {
  if (loading) return <p className="status">Loading restaurants…</p>
  if (error) return <p className="status error">Couldn't load restaurants: {error}</p>
  if (!restaurants.length) return <p className="status">No restaurants found.</p>

  return (
    <ul className="restaurant-list">
      {restaurants.map((r) => (
        <li key={r.id}>
          <button className="restaurant-card" onClick={() => onSelect(r)}>
            <span className="restaurant-name">{r.name}</span>
            <span className="restaurant-meta">
              {r.cuisine}
              {r.address ? ` · ${r.address}` : ''}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
