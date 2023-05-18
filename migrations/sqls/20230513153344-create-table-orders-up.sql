CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity integer NOT NULL,
    user_id bigint REFERENCES users(id),
    status BOOLEAN NOT NULL
);