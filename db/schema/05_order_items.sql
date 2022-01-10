-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id)

);
