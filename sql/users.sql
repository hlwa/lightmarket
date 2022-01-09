DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
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

INSERT INTO users
  (username,email, mobile, password)
VALUES
  (True, 'Georgina', 'georgina@email.com', 555-555-5551, '1234', 'nigeria', 'Lagos', 'Lagos', 'First street','M4532'),
  ('Hailan','hailan@email.com', 555-555-5552, 'abcd', 'Canada', 'ontario', 'toronto', '2nd steet','W1W 7R7'),
  ('Duygu','duygu@email.com', 555-555-5553 '5678', 'Canada','Vancouver', 'whistler','Park st','V5K 0A5'),
  ('Bob', 'bob@email.com',555-555-5554,'efgh', 'Canada', 'Alberta', 'Fort McMurray', 'Main st', 'K1A 0B1'),
  ('Thomas', 'thomas@email.com', 555-555-5555, '4321', 'Canada', 'Nova Scotia','Halifax','Water St' ,'B3H 0A2' );
