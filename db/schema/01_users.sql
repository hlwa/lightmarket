-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  seller BOOLEAN DEFAULT FALSE,
  username VARCHAR(50),
  email VARCHAR(50),
  mobile INTEGER,
  password VARCHAR(50),
  country VARCHAR(50),
  province VARCHAR(50),
  city VARCHAR(50),
  street VARCHAR(50),
  postal VARCHAR(50)
);

