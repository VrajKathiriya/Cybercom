-- create person table
CREATE TABLE person(
person_id INT PRIMARY KEY,
last_name VARCHAR(50),
first_name VARCHAR(50)
);

-- create table address
CREATE TABLE address(
address_id INT PRIMARY KEY,
person_id INT,
city VARCHAR(50),
state VARCHAR(50)
);

-- insert values into person table
INSERT INTO person 
(person_id, last_name, first_name) 
VALUES
(1, 'Wang', 'Allen'),
(2, 'Alice', 'Bob');

-- insert values into address table
INSERT INTO address 
(address_id, person_id, city, state) 
VALUES
(1, 2, 'New York City', 'New York'),
(2, 3, 'Leetcode', 'California');

-- select all person present in person table
SELECT 
	p.first_name,
    p.last_name,
    a.city ,
    a.state
FROM person AS p
LEFT JOIN address AS a
ON p.person_id = a.person_id;
