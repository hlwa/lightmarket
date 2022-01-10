DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  seller_id INTEGER REFERENCES users(id),
  price DECIMAL,
  sold BOOLEAN DEFAULT True,
  description TEXT,
  url TEXT
);
