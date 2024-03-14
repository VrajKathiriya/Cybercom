-- create returns table
CREATE TABLE returns(
return_id INT PRIMARY KEY,
order_id INT,
FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO returns (return_id, order_id)
VALUES 
(1, 2),
(2, 5),
(3, 6),
(4, 11),
(5, 12),
(6, 13),
(7, 15);

-- 1.	Write a SQL query to retrieve the names of all customers who have made at least
--  one order in the "orders" table and have not made any orders in the "returns" table
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
WHERE c.customer_id NOT IN(
	SELECT o1.customer_id
    FROM orders o1
    JOIN returns r1
    ON o1.id = r1.order_id
);

-- 2.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders"
-- table and have returned at least one item in the "returns" table
SELECT DISTINCT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN returns r
ON r.order_id = o.id;


-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders"
-- table and have not returned any items in the "returns" table.
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
WHERE c.customer_id NOT IN(
	SELECT o1.customer_id
    FROM orders o1
    JOIN returns r1
    ON o1.id = r1.order_id
);

-- 4.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table 
-- and have returned more items than they have ordered.

-- 5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table 
-- and have not returned more items than they have ordered
SELECT DISTINCT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id;

-- 6.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" 
-- table and have spent more than $100 in total on all orders
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id
HAVING SUM(o.amount) > 100;

-- 7.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" 
-- table and have spent more than $100 in total on all orders, sorted by the total amount spent in descending order.
SELECT c.first_name, c.last_name, ROUND(SUM(o.amount),2) AS total_spent
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id
HAVING total_spent > 100
ORDER BY total_spent DESC;

-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" 
-- table and have ordered products in all categories
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN products p
ON p.product_id = o.product_id
GROUP BY c.customer_id
HAVING COUNT(DISTINCT p.category) = (SELECT COUNT(DISTINCT category) FROM products);

-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table 
-- and have not ordered products in all categories
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN products p
ON p.product_id = o.product_id
GROUP BY c.customer_id
HAVING COUNT(DISTINCT p.category) < (SELECT COUNT(DISTINCT category) FROM products);

-- 10.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and 
-- have ordered products in at least two different categories
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN products p
ON p.product_id = o.product_id
GROUP BY c.customer_id
HAVING COUNT(DISTINCT p.category) >= 2;