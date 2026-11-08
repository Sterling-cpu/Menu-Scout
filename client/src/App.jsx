import { useEffect, useState } from 'react'
import './App.css'
import RestaurantList from './components/RestaurantList'
import MenuView from './components/MenuView'

function App() {
  const [restaurants, setRestaurants] = useState([])
  const [selected, setSelected] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [loadingRestaurants, setLoadingRestaurants] = useState(true)
  const [loadingMenu, setLoadingMenu] = useState(false)
  const [error, setError] = useState(null)

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

  return (
    <main className="app">
      <header className="app-header">
        <h1>Menu Scout</h1>
        <p>Eat out smarter — know the numbers before you order.</p>
      </header>

      {selected ? (
        <MenuView
          restaurant={selected}
          items={menuItems}
          loading={loadingMenu}
          error={error}
          onBack={() => {
            setSelected(null)
            setMenuItems([])
          }}
        />
      ) : (
        <>
          <h2 className="section-title">Nearby restaurants</h2>
          <RestaurantList
            restaurants={restaurants}
            onSelect={setSelected}
            loading={loadingRestaurants}
            error={error}
          />
        </>
      )}
    </main>
  )
}

export default App
