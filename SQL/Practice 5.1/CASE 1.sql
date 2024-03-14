-- create customers table
DROP TABLE customers;
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    country_name VARCHAR(100)
);

-- insert data into the customers table
INSERT INTO customers VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '555-1234', 'USA'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '555-5678', 'Canada'),
(3, 'Robert', 'Johnson', 'robert.johnson@example.com', '555-9876', 'UK'),
(4, 'Emily', 'Brown', 'emily.brown@example.com', '555-4321', 'Australia'),
(5, 'Michael', 'Davis', 'michael.davis@example.com', '555-8765', 'USA'),
(6, 'Sarah', 'Williams', 'sarah.williams@example.com', '555-2345', 'Canada'),
(7, 'Daniel', 'Jones', 'daniel.jones@example.com', '555-6789', 'UK'),
(8, 'Olivia', 'Martinez', 'olivia.martinez@example.com', '555-3456', 'Australia'),
(9, 'James', 'Taylor', 'james.taylor@example.com', '555-7890', 'India'),
(10, 'Ava', 'Anderson', 'ava.anderson@example.com', '555-6543', 'Canada');

-- create orders table
DROP TABLE orders;
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    amount FLOAT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- insert data into orders table
INSERT INTO orders 
VALUES
(1, 1,101, 100.50, '2024-03-13'),
(2, 3,101, 75.20, '2024-02-12'),
(3, 5,101, 50.00, '2024-01-13'),
(4, 2,102, 12000.75, '2024-01-23'),
(5, 7,103, 20000.30, '2024-03-13'),
(6, 4,104, 30.90, '2024-03-13'),
(7, 6,105, 80.60, '2024-03-13'),
(8, 9,105, 150.25, '2024-02-13' ),
(9, 8,103, 45.75, '2022-03-13'),
(10, 10,103, 95.40, '2024-02-1'),
(11, 2,103, 60.20, '2024-03-11'),
(12, 4,104, 35.75, '2024-01-13'),
(13, 2,104, 110.40, '2024-03-13'),
(14, 2,104, 75.90, '2024-03-13'),
(15, 2,105, 25.50, '2024-02-13'),
(16, 3,101, 90.25, '2024-03-12'),
(17, 5,101, 40.80, '2024-03-10'),
(18, 7,102, 70.10, '2024-03-11'),
(19, 3,103, 130.60, '2024-03-13'),
(20, 3,103, 55.15, '2024-03-13');

-- create products table
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255),
    price DECIMAL(10,2),
    category VARCHAR(50)
);

-- insert data into products table
INSERT INTO products 
(product_id, product_name, price, category) 
VALUES
(101, 'Laptop', 899.99, 'Electronics'),
(102, 'Table', 499.99, 'Furniture'),
(103, 'Pent', 79.99, 'Clothing'),
(104, 'Shirt', 349.99, 'Clothing'),
(105, 'Bluetooth Speaker', 67.99, 'Electronics');



-- create employees table
DROP TABLE employees;
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(255),
    employee_salary DECIMAL(10,2),
    department_id INT,
    country_name VARCHAR(200),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- insert data into employees table
INSERT INTO employees (employee_id, employee_name, employee_salary, department_id, country_name)
VALUES
(1, 'John Doe', 60000.00, 1, 'USA'),
(2, 'Jane Smith', 75000.00,1, 'UK'),
(3, 'Mike Johnson', 90000.00,2, 'USA'),
(4, 'Emily White', 80000.00,4, 'India'),
(5, 'David Brown', 70000.00,5, 'USA');

-- create departments table
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

-- Insert data into Departments table
INSERT INTO departments (department_id, department_name)
VALUES 
(1, 'HR'),
(2, 'Finance'),
(3, 'sales'),
(4, 'IT'),
(5, 'Operations');

-- create order_details table
DROP TABLE order_details;
CREATE TABLE order_details (
    order_id INT PRIMARY KEY,
    quantity INT,
    unit_price DECIMAL(10,2),
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- insert data into order_details table
INSERT INTO order_details (order_id, employee_id, quantity, unit_price)
VALUES
(1, 1, 205, 200.00),
(2, 2, 203, 150.00),
(3, 2, 200, 250.00),
(4, 2, 102, 300.00),
(5, 4, 404, 180.00);

-- 1.	Write a SQL query to retrieve the top 10 customers who have made the most orders in the "orders" table, 
-- along with the total number of orders they have made
SELECT c.*, COUNT(o.id) AS total_orders
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_orders DESC
LIMIT 10;

-- 2.	Write a SQL query to retrieve the names of all employees who have sold more than
-- $100,000 worth of products in the "order_details" table, sorted by the amount sold in descending order
SELECT e.employee_name, SUM(od.quantity * od.unit_price) AS total_sales
FROM employees e
JOIN order_details od
ON e.employee_id = od.employee_id
GROUP BY e.employee_name
HAVING total_sales > 100000; 

-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
-- along with the total amount they have spent on all orders and the total amount they have spent on orders made in the last 30 days
SELECT
    c.first_name,
    c.last_name,
    ROUND(SUM(o.amount),2)  AS total_amount,
    ROUND(SUM(
    CASE WHEN o.order_date >= (CURRENT_DATE - INTERVAL 30 DAY) 
		THEN o.amount 
        ELSE 0 
        END
	),2) AS total_amount_last_30_days
FROM customers c
JOIN orders o 
ON c.customer_id = o.customer_id
GROUP BY  c.first_name, c.last_name;

-- 4.	Write a SQL query to retrieve the names and salaries of all employees 
-- who have a salary greater than the average salary of all employees in the "employees" table, sorted by salary in descending order
SELECT employee_name , employee_salary 
FROM employees
WHERE employee_salary > (
	SELECT AVG(employee_salary) FROM employees
)
ORDER BY employee_salary DESC;


-- 5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
-- but have not made any orders in the last 90 days
SELECT c.first_name AS customer_name
FROM customers c
JOIN orders o
ON c.customer_id  = o.customer_id
WHERE order_date <= (CURRENT_DATE - INTERVAL 90 DAY);

-- 6.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the minimum salary of their department 
-- in the "employees" table, sorted by department ID and then by salary in descending order.
SELECT 
    e.employee_name,
    e.employee_salary,
    e.department_id
FROM 
    employees e
JOIN  (
	SELECT department_id,MIN(employee_salary) AS min_salary
        FROM employees
        GROUP BY department_id
    ) m
ON e.department_id = m.department_id AND e.employee_salary > m.min_salary
ORDER BY 
    e.department_id, e.employee_salary DESC;

-- 7.	Write a SQL query to retrieve the names and salaries of the five highest paid employees in each department of the "employees" table,
--  sorted by department ID and then by salary in descending order
WITH RankedEmployees AS (
    SELECT
        employee_name,
        employee_salary,
        department_id,
        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY employee_salary DESC) AS salary_rank
    FROM employees
)
SELECT
    employee_name, employee_salary,department_id,salary_rank
FROM RankedEmployees
WHERE salary_rank <= 5
ORDER BY department_id, salary_rank;
    
-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
-- but have not made any orders for products in the "products" table with a price greater than $100
SELECT  DISTINCT c.first_name
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE NOT EXISTS (
    SELECT 1
    FROM products p
    WHERE p.product_id = o.product_id AND p.price > 100
);

-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
-- along with the total amount they have spent on all orders and the average amount they have spent per order
SELECT c.first_name,c.last_name, ROUND(SUM(o.amount),2) AS total_amount,  ROUND(AVG(o.amount),2) AS average_amount_per_order
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id;


-- 10.	Write a SQL query to retrieve the names of all products in the "products" table that have been ordered by customers in more than one country,
--  along with the names of the countries where the products have been ordered.
SELECT DISTINCT p.product_name,c.country_name
FROM products p
JOIN orders o 
ON p.product_id = o.product_id
JOIN customers c 
ON o.customer_id = c.customer_id
WHERE p.product_id IN (
        SELECT o1.product_id
        FROM orders o1
        JOIN customers c1 
        ON o1.customer_id = c1.customer_id
        GROUP BY o1.product_id
        HAVING COUNT(DISTINCT c1.country_name) > 1
);


