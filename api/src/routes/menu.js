import { Router } from 'express'
import { supabase } from '../supabase.js'

const router = Router()

function dbUnavailable(_req, res) {
  res.status(503).json({ error: 'Database not configured' })
}

// GET /api/restaurants — list all restaurants
router.get('/restaurants', async (req, res, next) => {
  if (!supabase) return dbUnavailable(req, res)
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('name')
    if (error) throw error
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// GET /api/restaurants/:id/menu — menu items for one restaurant
router.get('/restaurants/:id/menu', async (req, res, next) => {
  if (!supabase) return dbUnavailable(req, res)
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', req.params.id)
      .order('estimated_calories', { ascending: true, nullsFirst: false })
    if (error) throw error
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// GET /api/menu-items — all menu items (for compare/filter features)
router.get('/menu-items', async (req, res, next) => {
  if (!supabase) return dbUnavailable(req, res)
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, restaurants(name, cuisine)')
      .order('name')
    if (error) throw error
    res.json(data)
  } catch (err) {
    next(err)
  }
})

export default router
