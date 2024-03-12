-- create employees table
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    title VARCHAR(100),
    department_name VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
);

-- create managers table
CREATE TABLE managers (
    manager_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
INSERT INTO managers (manager_id, first_name, last_name)
VALUES
(1, 'John', 'Doe'),
(2, 'David', 'Wilson'), 
(3, 'Jane', 'Doe'),      
(4, 'Emily', 'Wilson'); 

CREATE TABLE dependents (
    dependent_id INT PRIMARY KEY,
    employee_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    relationship VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

INSERT INTO dependents 
(dependent_id, employee_id, first_name, last_name, relationship) 
VALUES
(1, 1, 'Emma', 'Smith', 'Daughter'),
(2, 1, 'James', 'Johnson', 'Son'),
(3, 3, 'Sophia', 'Davis', 'Spouse'),
(4, 4, 'Ethan', 'Williams', 'Son'),
(5, 5, 'Olivia', 'Jones', 'Daughter');

-- insert data into employees table
INSERT INTO employees VALUES
(1, 'John', 'Doe', 'Manager', 'HR', 60000.00, '2022-01-01',1),
(2, 'Jane', 'Smith', 'Sales Associate', 'Sales', 50000.00, '2022-02-15',2),
(3, 'Bob', 'Johnson', 'Manager', 'IT', 70000.00, '1998-03-10',2),
(4, 'Alice', 'Williams', 'Developer', 'IT', 80000.00, '1923-04-20',4),
(5, 'Michael', 'Miller', 'Manager', 'Sales', 72000.00, '2022-06-15',3),
(6, 'Sara', 'Davis', 'HR Specialist', 'HR', 58000.00, '2022-07-20',3),
(7, 'Ryan', 'Jones', 'Software Engineer', 'IT', 85000.00, '1956-08-25',2),
(8, 'Olivia', 'White', 'Financial Analyst', 'Sales', 60000.00, '1987-09-30',2),
(9, 'Daniel', 'Moore', 'Sales Associate', 'Sales', 52000.00, '2022-10-10',2);


-- 1.	Write a query that returns the first and last name of all employees
--      who have a title that contains the word "Manager".
SELECT first_name, last_name
FROM employees
WHERE title LIKE '%Manager%';

-- 2.	Write a query that returns the department name and the average salary of all employees in each department
SELECT department_name, AVG(salary)
FROM employees
GROUP BY department_name;

-- 3.	Write a query that returns the number of employees who were hired in each year, sorted by year.
SELECT COUNT(employee_id) AS total_employees, YEAR(hire_date) AS year
FROM employees
GROUP BY YEAR(hire_date)
ORDER BY YEAR(hire_date);

-- 4.	Write a query that returns the first name, last name, and salary of the top 5 highest-paid employees.
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;

-- 5.	Write a query that updates the salary of all employees in the "Sales" department
--  to be 10% higher than their current salary.
SET SQL_SAFE_UPDATES = 0;
UPDATE employees
SET salary = salary + (salary * 0.1)
WHERE department_name = 'sales';

-- 6.	Write a query that deletes all employees who were hired before the year 2000.
DELETE FROM employees
WHERE YEAR(hire_date) < 2000;

-- 7.	Write a query that creates a new table called "employee_stats" that contains the following columns: 
-- "department_name", "total_employees", and "average_salary". 
-- The table should include one row for each department.
CREATE TABLE employee_stats AS
SELECT department_name, COUNT(employee_id) AS total_employees, AVG(salary) AS average_salary
FROM employees
GROUP BY department_name;


 
-- 8.	Write a query that returns the first and last name of all employees 
-- who have the same last name as their manager
SELECT a.first_name , a.last_name 
FROM employees a 
JOIN managers b 
ON a.manager_id = b.manager_id AND a.last_name = b.last_name ; 

-- 9.	Write a query that returns the top 2 departments with the highest average salary
SELECT department_name
FROM employee_stats
ORDER BY average_salary DESC
LIMIT 2;

-- 10.	Write a query that returns the first and last name of all employees 
-- who have at least one dependent. Sort the results by last name.
SELECT a.first_name , a.last_name  
FROM employees a 
WHERE a.employee_id in ( 
 SELECT DISTINCT (b.employee_id) 
 FROM dependents b 
 ) 
 ORDER BY a.last_name;
