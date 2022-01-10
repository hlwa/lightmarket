DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE order (
  id SERIAL PRIMARY INTEGER,
 user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 created_at TIMESTAMP
)
