-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  is_seller BOOLEAN,
  username VARCHAR(50),
  email VARCHAR(50),
  mobile INTEGER,
  password VARCHAR(50),
  country VARCHAR(50),
  province VARCHAR(50),
  city VARCHAR(50),
  street VARCHAR(50),
  postal VARCHAR(50),
);

