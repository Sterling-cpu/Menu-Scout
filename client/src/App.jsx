import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then(setHealth)
      .catch(() => setHealth({ status: 'api unreachable' }))
  }, [])

  return (
    <main className="app">
      <header className="app-header">
        <h1>Menu Scout</h1>
        <p>Eat out smarter — scan menus, know your numbers.</p>
      </header>

      <section className="card">
        <h2>Project scaffold</h2>
        <p>
          React PWA client is running. API status:{' '}
          <strong>{health ? health.status : 'checking…'}</strong>
        </p>
        <ul>
          <li>US 1 — Scan restaurant menu (planned)</li>
          <li>US 2 — Set dietary goals in profile (planned)</li>
          <li>US 3 — Record food allergies (planned)</li>
          <li>US 4 — View recommended dishes (planned)</li>
          <li>US 5 — Filter menu items (planned)</li>
          <li>US 6 — Compare dishes side by side (planned)</li>
          <li>US 7 — Save favorite dishes (planned)</li>
          <li>US 8 — Share dish recommendations (planned)</li>
          <li>US 9 — Discover nearby restaurants (planned)</li>
        </ul>
      </section>
    </main>
  )
}

export default App
