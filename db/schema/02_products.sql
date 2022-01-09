DROP TABLE IF EXISTS users;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  seller_id INTEGER NOT NULL,
  price DECIMAL,
  sold BOOLEAN DEFAULT True,
  description TEXT





