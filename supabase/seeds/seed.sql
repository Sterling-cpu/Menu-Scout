-- Sample data for local development and demos
-- Run after 0001_init_schema.sql in the Supabase SQL editor

insert into public.restaurants (name, address, cuisine, latitude, longitude) values
  ('Green Bowl Cafe', '120 Main St, Chico, CA', 'Salads & Grain Bowls', 39.7285, -121.8375),
  ('Ironworks Diner', '45 Broadway Ave, Chico, CA', 'American Diner', 39.7300, -121.8400),
  ('Verde Taqueria', '310 Pine St, Chico, CA', 'Mexican', 39.7250, -121.8450);

insert into public.menu_items
  (restaurant_id, name, description, estimated_calories, protein_g, carbs_g, sugar_g, fat_g, allergens, source)
select r.id, m.name, m.description, m.calories, m.protein, m.carbs, m.sugar, m.fat, m.allergens, 'manual'
from public.restaurants r
join (values
  ('Green Bowl Cafe', 'Grilled Chicken Quinoa Bowl', 'Grilled chicken, quinoa, roasted vegetables, lemon tahini', 520, 42.0, 48.0, 6.0, 16.0, array['sesame','soy']::text[]),
  ('Green Bowl Cafe', 'Harvest Salad', 'Mixed greens, apple, walnuts, goat cheese, balsamic vinaigrette', 380, 14.0, 22.0, 14.0, 24.0, array['dairy','nuts']::text[]),
  ('Green Bowl Cafe', 'BBQ Tofu Wrap', 'BBQ tofu, slaw, pickles in a flour tortilla', 610, 24.0, 72.0, 18.0, 22.0, array['gluten','soy']::text[]),
  ('Ironworks Diner', 'Protein Stack Pancakes', 'Buttermilk pancakes with chicken sausage and eggs', 780, 38.0, 92.0, 24.0, 28.0, array['gluten','dairy','eggs']::text[]),
  ('Ironworks Diner', 'Turkey Club Sandwich', 'Roast turkey, bacon, lettuce, tomato, mayo on sourdough', 640, 36.0, 58.0, 8.0, 26.0, array['gluten','eggs','fish']::text[]),
  ('Ironworks Diner', 'Garden Omelette', 'Three-egg omelette with spinach, mushroom, and feta', 420, 30.0, 6.0, 3.0, 30.0, array['eggs','dairy']::text[]),
  ('Verde Taqueria', 'Carne Asada Burrito Bowl', 'Grilled steak, rice, beans, salsa, guacamole', 720, 44.0, 78.0, 6.0, 26.0, array[]::text[]),
  ('Verde Taqueria', 'Fish Tacos (2)', 'Battered fish, cabbage slaw, crema on corn tortillas', 560, 28.0, 52.0, 9.0, 24.0, array['fish','dairy','gluten']::text[]),
  ('Verde Taqueria', 'Chips & Guacamole', 'Fried tortilla chips with fresh guacamole', 480, 8.0, 58.0, 2.0, 26.0, array[]::text[])
) as m(restaurant_name, name, description, calories, protein, carbs, sugar, fat, allergens)
on r.name = m.restaurant_name;
