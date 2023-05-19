CREATE TABLE product_order(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id)
)