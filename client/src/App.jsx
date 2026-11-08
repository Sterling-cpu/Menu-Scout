import { useEffect, useMemo, useState } from 'react'
import './App.css'
import RestaurantList from './components/RestaurantList'
import MenuView from './components/MenuView'
import FavoritesPage from './components/FavoritesPage'
import ProfilePage from './components/ProfilePage'
import CompareView from './components/CompareView'
import { loadProfile, saveProfile, loadFavorites, saveFavorites } from './lib/storage'
import { dishSnapshot, shareDish } from './lib/nutrition'

const TABS = [
  { id: 'browse', label: 'Browse' },
  { id: 'scan', label: 'Scan' },
  { id: 'compare', label: 'Compare' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'profile', label: 'Profile' },
]

function App() {
  const [tab, setTab] = useState('browse')
  const [restaurants, setRestaurants] = useState([])
  const [selected, setSelected] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [loadingRestaurants, setLoadingRestaurants] = useState(true)
  const [loadingMenu, setLoadingMenu] = useState(false)
  const [error, setError] = useState(null)

  const [profile, setProfile] = useState(loadProfile)
  const [favorites, setFavorites] = useState(loadFavorites)
  const [compareItems, setCompareItems] = useState([])
  const [shareMsg, setShareMsg] = useState('')

  const favoriteIds = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites])
  const compareIds = useMemo(() => new Set(compareItems.map((c) => c.id)), [compareItems])

  useEffect(() => {
    fetch('/api/restaurants')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setRestaurants)
      .catch((err) => setError(err.message))
      .finally(() => setLoadingRestaurants(false))
  }, [])

  useEffect(() => {
    if (!selected) return
    setLoadingMenu(true)
    setError(null)
    fetch(`/api/restaurants/${selected.id}/menu`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setMenuItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoadingMenu(false))
  }, [selected])

  const updateProfile = (p) => {
    setProfile(p)
    saveProfile(p)
  }

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id)
      const next = exists
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, dishSnapshot(item, selected)]
      saveFavorites(next)
      return next
    })
  }

  const toggleCompare = (item) => {
    setCompareItems((prev) => {
      if (prev.some((c) => c.id === item.id)) {
        return prev.filter((c) => c.id !== item.id)
      }
      if (prev.length >= 3) return prev
      return [...prev, dishSnapshot(item, selected)]
    })
  }

  const removeFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id)
      saveFavorites(next)
      return next
    })
  }

  const removeCompare = (id) =>
    setCompareItems((prev) => prev.filter((c) => c.id !== id))

  const handleShare = async (item, restaurantName) => {
    const result = await shareDish(item, restaurantName)
    if (result === 'copied') {
      setShareMsg('Link text copied to clipboard!')
      setTimeout(() => setShareMsg(''), 2500)
    }
  }

  const renderTab = () => {
    switch (tab) {
      case 'favorites':
        return <FavoritesPage favorites={favorites} onRemove={removeFavorite} />
      case 'profile':
        return <ProfilePage profile={profile} onSave={updateProfile} />
      case 'compare':
        return (
          <CompareView
            items={compareItems}
            onRemove={removeCompare}
            onClear={() => setCompareItems([])}
            onBack={() => setTab('browse')}
          />
        )
      case 'scan':
        return (
          <section>
            <h2 className="section-title">Scan a menu</h2>
            <div className="card">
              <p>
                Camera scanning is planned for a later milestone. For now, browse
                nearby restaurants and view estimated nutrition manually.
              </p>
              <button className="secondary-button" onClick={() => setTab('browse')}>
                Browse restaurants instead
              </button>
            </div>
          </section>
        )
      default:
        return selected ? (
          <MenuView
            restaurant={selected}
            items={menuItems}
            loading={loadingMenu}
            error={error}
            onBack={() => {
              setSelected(null)
              setMenuItems([])
            }}
            profile={profile}
            favoriteIds={favoriteIds}
            compareIds={compareIds}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onShare={(item) => handleShare(item, selected.name)}
            onViewCompare={() => setTab('compare')}
          />
        ) : (
          <>
            <h2 className="section-title">Nearby restaurants</h2>
            <RestaurantList
              restaurants={restaurants}
              onSelect={(r) => {
                setSelected(r)
                setTab('browse')
              }}
              loading={loadingRestaurants}
              error={error}
            />
          </>
        )
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Menu Scout</h1>
        <p>Eat out smarter — know the numbers before you order.</p>
      </header>

      {shareMsg && <div className="toast">{shareMsg}</div>}

      {renderTab()}

      <nav className="tab-bar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab-button ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === 'compare' && compareItems.length > 0 && (
              <span className="tab-badge">{compareItems.length}</span>
            )}
          </button>
        ))}
      </nav>
    </main>
  )
}

export default App
