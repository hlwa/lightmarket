DROP TABLE IF EXISTS cart_items CASCADE;

CREATE TABLE cart_items (
id SERIAL PRIMARY KEY NOT NULL,
order_id INTEGER REFERENCES orders(id) ,
product_id INTEGER REFERENCES products(id)
);
