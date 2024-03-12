-- create customers table
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name TEXT,
    email TEXT,
    created_at TIMESTAMP
);
drop table customers;
-- insert data into customers table
INSERT INTO customers 
(id, name, email, created_at) 
VALUES
(1, 'John Smith', 'johnsmith@gmail.com', '2022-01-01 10:00:00'),
(2, 'Jane Doe', 'janedoe@yahoo.com', '2022-01-01 11:00:00'),
(3, 'Bob Johnson', 'bobjohnson@hotmail.com', '2022-01-03 12:00:00'),
(4, 'Sarah Lee', 'sarahlee@gmail.com', '2022-01-04 13:00:00'),
(5, 'David Kim', 'davidkim@yahoo.com', '2022-01-05 14:00:00');

-- 1.	Write a query that selects all customers whose email address ends with "@gmail.com".
SELECT * FROM customers
WHERE email LIKE '%@gmail.com';

-- 2.	Write a query that selects the customer with the earliest created_at date.
SELECT * FROM customers
WHERE created_at = (SELECT MIN(created_at) FROM customers);

-- 3.	Write a query that selects the name and email of customers who were created on or after January 3, 2022.
SELECT name,email
FROM customers
WHERE DATE(created_at) > '2022-01-03';

-- 4.	Write a query that updates the email address of the customer with id=5 to "davidkim@gmail.com".
UPDATE customers
SET email = 'davidkim@gmail.com'
WHERE id = 5;

-- 5.	Write a query that deletes the customer with id=2
DELETE FROM customers
WHERE id = 2;

-- 6.	Write a query that calculates the total number of customers in the "customers" table.
SELECT COUNT(id)
FROM customers;











