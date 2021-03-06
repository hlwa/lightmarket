
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  price DECIMAL,
  sold BOOLEAN DEFAULT true,
  description TEXT,
  url TEXT
);

