import { shareDish } from '../lib/nutrition'
import MenuItemCard from './MenuItemCard'

export default function FavoritesPage({ favorites, onRemove }) {
  const handleShare = async (fav) => {
    await shareDish(fav, fav.restaurantName)
  }

  if (!favorites.length) {
    return (
      <section>
        <h2 className="section-title">Favorites</h2>
        <p className="status">No saved dishes yet. Tap the ♥ on any dish to save it here.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">Favorites</h2>
      <div className="menu-list">
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-wrap">
            <MenuItemCard item={fav} restaurantName={fav.restaurantName} />
            <div className="favorite-actions">
              <button className="link-button" onClick={() => handleShare(fav)}>
                Share
              </button>
              <button className="link-button danger" onClick={() => onRemove(fav.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
