-- create table employee
CREATE TABLE employee(
emp_id INT PRIMARY KEY AUTO_INCREMENT,
emp_name VARCHAR(150) NOT NULL,
emp_role VARCHAR(50),
emp_age INT,
days_of_leave INT,
reason VARCHAR(150)
);

-- insert data into table
INSERT INTO employee (emp_name, emp_role, emp_age, days_of_leave, reason)
VALUES
('Vraj Kathiriya', 'Manager', 35, 5, 'Vacation'),
('Jane Smith', 'Developer', 28, 3, 'Family event'),
('Bob Johnson', 'Analyst', 42, 7, 'Health reasons'),
('Alice Williams', 'Designer', 30, 4, 'Personal time'),
('Charlie Brown', 'Tester', 25, 2, 'Short break'),
('Diana Lee', 'Manager', 38, 6, 'Holiday trip'),
('Eric Taylor', 'Developer', 31, 4, 'Educational leave'),
('Fiona Miller', 'Analyst', 45, 8, 'Family vacation'),
('George Wilson', 'Designer', 29, 3, 'Medical Emergancy'),
('Hannah Davis', 'Tester', 26, 2, 'Medical Emergancy');

-- select all the employee
SELECT * FROM employee;