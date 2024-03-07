USE cybercom;

-- create customer table
CREATE TABLE customers(
id INT PRIMARY KEY,
name VARCHAR(100)
);

-- create orders table
CREATE TABLE orders(
id INT PRIMARY KEY,
customerId INT,
FOREIGN KEY (customerId) REFERENCES customers(id)
);

-- insert value into customer table
INSERT INTO customers
(id, name) 
VALUES
(1, 'Joe'),
(2, 'Henry'),
(3, 'Sam'),
(4, 'Max');

-- insert value into orders table
INSERT INTO orders
(id, customerId)
VALUES
(1,3),
(2,1);

-- select customer who don't have any orders yet
SELECT name AS Customers FROM customers
WHERE id NOT IN(
SELECT customerId FROM orders
);

