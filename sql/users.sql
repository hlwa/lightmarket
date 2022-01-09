DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(50),
  mobile int,
  password VARCHAR(50)
);

INSERT INTO users
  (username,email, mobile, password)
VALUES
  ('Georgina', 'georgina@email.com', 555-555-5551 '1234'),
  ('Hailan','hailan@email.com', 555-555-5552, 'abcd'),
  ('Duygu','duygu@email.com', 555-555-5553 '5678'),
  ('Bob', 'bob@email.com',555-555-5554,'efgh'),
  ('Thomas', 'thomas@email.com', 555-555-5555, '4321');
