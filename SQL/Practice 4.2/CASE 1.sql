-- create departments table
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

-- create employees table
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department_id INT,
    salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- create salaries table
CREATE TABLE salaries (
    employee_id INT,
    salary DECIMAL(10, 2) NOT NULL,
    date DATE,
    PRIMARY KEY (employee_id, date),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Insert data into Departments table
INSERT INTO departments (department_id, department_name)
VALUES 
(1, 'HR'),
(2, 'Finance'),
(3, 'sales'),
(4, 'IT'),
(5, 'Operations');


-- Insert data into Employees table
INSERT INTO employees (employee_id, name, department_id, salary)
VALUES 
(101, 'John Doe', 1, 60000),
(102, 'Jane Smith', 2, 75000),
(103, 'Bob Johnson', 3, 70000),
(104, 'Alice Brown', 3, 80000),
(105, 'Charlie Wilson', 5, 65000),
(106, 'Eva Martinez', 1, 62000),
(107, 'David Lee', 2, 80000),
(108, 'Sophie Nguyen', 3, 72000),
(109, 'Michael Davis', 2, 85000),
(110, 'Olivia Taylor', 2, 68000);


-- Insert data into Salaries table
INSERT INTO salaries (employee_id, salary, date)
VALUES 
(101, 60000, '2024-01-01'),
(102, 75000, '2022-03-21'),
(103, 70000, '2022-03-10'),
(104, 80000, '2021-02-11'),
(105, 65000, '2020-03-11');

-- 1.	Write a query to return the names of all employees who work in the 'Sales' department
SELECT e.name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id
WHERE department_name = 'sales';

-- 2.	Write a query to return the total number of employees in each department, ordered by department name
SELECT d.department_name AS Department, COUNT(e.employee_id) AS employees
FROM departments d
LEFT JOIN employees e
ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

-- 3.	Write a query to return the average salary for each department, ordered by department name.
SELECT d.department_name AS Department, AVG(e.salary) AS average_salary
FROM departments d
LEFT JOIN employees e
ON d.department_id = e.department_id
GROUP BY d.department_name;

-- 4.	Write a query to return the top 10% of highest paid employees, ordered by salary.
-- Create stored procedure
DELIMITER //
CREATE PROCEDURE get_ten_percent()
BEGIN
    DECLARE totalEmployees INT;
    DECLARE tenPercent INT;
    
    SELECT COUNT(*) INTO totalEmployees FROM Employees;

    SET tenPercent = CEIL(totalEmployees * 0.1);

    SELECT * FROM Employees 
    ORDER BY salary DESC
    LIMIT tenPercent;
END //
DELIMITER ;

CALL get_ten_percent();

-- 5.	Write a query to return the salary of each employee for their latest salary entry.
SELECT max(b.date) AS latest_salry_date , a.name , a.salary 
FROM employees a 
JOIN salaries b 
ON a.employee_id = b.employee_id 
GROUP BY b.employee_id;
