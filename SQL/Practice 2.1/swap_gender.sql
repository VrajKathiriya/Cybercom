-- create table salary
CREATE TABLE salary(
id INT PRIMARY KEY,
name VARCHAR(100),
sex ENUM('m','f'),
salary INT
);

-- insert values into salary table
INSERT INTO salary
(id, name, sex, salary)
VALUES
(1,'john','m',20000),
(2,'vraj','m',80000),
(3,'sita','f',30000),
(4,'ram','m',50000),
(5,'gita','f',40000);

UPDATE salary
SET sex = CASE
    WHEN sex = 'm' THEN 'f'
    ELSE 'm'
END;


SELECT * FROM salary;