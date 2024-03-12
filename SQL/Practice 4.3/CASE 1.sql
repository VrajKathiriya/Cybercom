-- create users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- create orders table
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    amount FLOAT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert data into users table
INSERT INTO users (id, name, email, password, created_at, updated_at)
VALUES 
(1, 'John Doe', 'john.doe@example.com', '123456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Jane Smith', 'jane.smith@example.com', 'password123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Bob Johnson', 'bob.johnson@example.com', 'qwerty', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Alice Brown', 'alice.brown@example.com', 'pass123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Charlie Wilson', 'charlie.wilson@example.com', 'abcxyz', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- insert data into orders table
DROP TABLE orders;
INSERT INTO orders (id, user_id, amount, created_at, updated_at)
VALUES 
(101, 1, 50.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(102, 2, 75.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(103, 2, 100.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(104, 3, 45.75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(105, 4, 60.25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- 1.	Create a new user with the following information:
-- name: John Doe
-- email: john.doe@example.com
-- password: 123456
-- created_at: current timestamp
-- updated_at: current timestamp

INSERT INTO users 
(id,name, email, password, created_at, updated_at)
VALUES 
(1,'John Doe', 'john.doe@example.com', '123456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2.	Retrieve the names and email addresses of all users who have placed at least one order.
SELECT DISTINCT u.name AS name, u.email AS email
FROM users u
INNER JOIN orders o
ON u.id = o.user_id;

-- 3.	Retrieve the total amount of orders placed by each user, sorted in descending order of total amount.
SELECT u.name AS user, SUM(o.amount) AS total_amount
FROM users u
LEFT JOIN orders o
ON u.id = o.user_id
GROUP BY u.name;

-- 4.	Retrieve the email address of the user who has placed the most orders.
SELECT u.email
FROM users u
JOIN (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
    ORDER BY order_count DESC
    LIMIT 1
) AS most_orders ON u.id = most_orders.user_id;

-- 5.	Retrieve the user IDs and the total amount of orders placed by users 
-- who have placed at least one order and whose total amount of orders exceeds $100.
SELECT u.id AS user_id, SUM(o.amount) AS total
FROM orders o
LEFT JOIN users u
ON o.user_id = u.id
GROUP BY u.id
HAVING total > 100;

-- 6.	Retrieve the number of users who have not placed any orders
-- 1st solution
SELECT COUNT(*) AS users_without_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- 2nd solution
SELECT COUNT(u.id) AS users_without_orders
FROM users u
WHERE id NOT IN( 
	SELECT user_id
    FROM orders
);

-- 7.	Update the user with ID 1 to change their email address to "jane.doe@example.com".
UPDATE users
SET email = 'jane.doe@example.com'
WHERE id = 1;

-- 8.	Delete all orders placed by users whose email address contains the string "test".
DELETE FROM orders
WHERE user_id = (
	SELECT id
    FROM users
    WHERE email LIKE '%test%'
);

-- 9.	Retrieve the total amount of orders placed on each day of the current week, grouped by day
SELECT DAY(created_at) AS day, SUM(amount) AS total_amount
FROM orders  
GROUP BY DAY(created_at);

-- 10.	Retrieve the IDs and email addresses of users who have placed an order in the current year 
-- and whose email address is in the format "example.com".
SELECT DISTINCT u.id AS user_id, u.email AS email
FROM orders o
LEFT JOIN users u
ON o.user_id = u.id
WHERE YEAR(o.created_at) = YEAR(CURDATE()) AND email LIKE '%example.com%';




