-- create table employees
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(100),
    salary DECIMAL(10, 2)
);

-- Insert data into the employees table
INSERT INTO employees (id, name, department, salary)
VALUES
(1, 'Vraj Kathiriya', 'sales', 60000.00),
(2, 'Decoster Sharma', 'sales', 55000.00),
(3, 'John Doe', 'marketing', 60000.00),
(4, 'Alice Brown', 'sales', 48000.00),
(5, 'Bob Brown', 'sales', 52000.00);

-- Write a SQL query to retrieve the names and salaries of all employees in the "sales" department 
-- who earn more than $50,000 per year.
SELECT name, salary 
FROM employees
WHERE department  = 'sales' AND salary > 50000;