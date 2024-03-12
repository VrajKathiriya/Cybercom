-- create table orders 
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2)
);

-- insert data into the orders table
INSERT INTO orders (id, customer_id, order_date, total_amount)
VALUES
(1, 101, '2022-03-07', 160.00),
(2, 102, '2022-04-08', 220.00),
(3, 101, '2022-05-10', 120.00),
(4, 103, '2022-08-16', 190.00),
(5, 102, '2023-03-11', 250.00);

-- Write a SQL query to calculate the total amount of orders for each customer, 
-- sorted in descending order by total amount.
SELECT customer_id, SUM(total_amount) AS total_amount
FROM orders
GROUP BY customer_id
ORDER BY total_amount DESC;




