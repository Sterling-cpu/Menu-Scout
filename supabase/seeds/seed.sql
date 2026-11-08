-- Sample data for local development and demos
-- Run after 0001_init_schema.sql in the Supabase SQL editor

-- Restaurants
insert into public.restaurants (name, address, cuisine, latitude, longitude) values
  ('Green Bowl Cafe', '120 Main St, Chico, CA', 'Salads & Grain Bowls', 39.7285, -121.8375),
  ('Ironworks Diner', '45 Broadway Ave, Chico, CA', 'American Diner', 39.7300, -121.8400),
  ('Verde Taqueria', '310 Pine St, Chico, CA', 'Mexican', 39.7250, -121.8450);

-- Green Bowl Cafe menu
insert into public.menu_items
  (restaurant_id, name, description, estimated_calories, protein_g, carbs_g, sugar_g, fat_g, allergens, source)
select id, v.name, v.description, v.calories, v.protein, v.carbs, v.sugar, v.fat, v.allergens, 'manual'
from public.restaurants r,
(values
  ('Grilled Chicken Quinoa Bowl', 'Grilled chicken, quinoa, roasted vegetables, lemon tahini', 520, 42.0, 48.0, 6.0, 16.0, array['sesame','soy']::text[]),
  ('Harvest Salad', 'Mixed greens, apple, walnuts, goat cheese, balsamic vinaigrette', 380, 14.0, 22.0, 14.0, 24.0, array['dairy','nuts']::text[]),
  ('BBQ Tofu Wrap', 'BBQ tofu, slaw, pickles in a flour tortilla', 610, 24.0, 72.0, 18.0, 22.0, array['gluten','soy']::text[])
) as v(name, description, calories, protein, carbs, sugar, fat, allergens)
where r.name = 'Green Bowl Cafe';

-- Ironworks Diner menu
insert into public.menu_items
  (restaurant_id, name, description, estimated_calories, protein_g, carbs_g, sugar_g, fat_g, allergens, source)
select id, v.name, v.description, v.calories, v.protein, v.carbs, v.sugar, v.fat, v.allergens, 'manual'
from public.restaurants r,
(values
  ('Protein Stack Pancakes', 'Buttermilk pancakes with chicken sausage and eggs', 780, 38.0, 92.0, 24.0, 28.0, array['gluten','dairy','eggs']::text[]),
  ('Turkey Club Sandwich', 'Roast turkey, bacon, lettuce, tomato, mayo on sourdough', 640, 36.0, 58.0, 8.0, 26.0, array['gluten','eggs','fish']::text[]),
  ('Garden Omelette', 'Three-egg omelette with spinach, mushroom, and feta', 420, 30.0, 6.0, 3.0, 30.0, array['eggs','dairy']::text[])
) as v(name, description, calories, protein, carbs, sugar, fat, allergens)
where r.name = 'Ironworks Diner';

-- Verde Taqueria menu
insert into public.menu_items
  (restaurant_id, name, description, estimated_calories, protein_g, carbs_g, sugar_g, fat_g, allergens, source)
select id, v.name, v.description, v.calories, v.protein, v.carbs, v.sugar, v.fat, v.allergens, 'manual'
from public.restaurants r,
(values
  ('Carne Asada Burrito Bowl', 'Grilled steak, rice, beans, salsa, guacamole', 720, 44.0, 78.0, 6.0, 26.0, array[]::text[]),
  ('Fish Tacos (2)', 'Battered fish, cabbage slaw, crema on corn tortillas', 560, 28.0, 52.0, 9.0, 24.0, array['fish','dairy','gluten']::text[]),
  ('Chips & Guacamole', 'Fried tortilla chips with fresh guacamole', 480, 8.0, 58.0, 2.0, 26.0, array[]::text[])
) as v(name, description, calories, protein, carbs, sugar, fat, allergens)
where r.name = 'Verde Taqueria';
