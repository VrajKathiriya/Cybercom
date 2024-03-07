-- create table person
CREATE TABLE person (
    id INT PRIMARY KEY,
    email VARCHAR(255) COLLATE utf8mb4_bin,
    CHECK(BINARY email = LOWER(email))
);

DROP TABLE person;

-- insert values with duplicate email
INSERT INTO person 
(id, email) 
VALUES 
(1, 'john@example.com'),
(2, 'alice@example.com'),
(3, 'mary@example.com'),
(4, 'john@example.com'),
(5, 'mary@example.com'),
(6, 'alice@example.com'),
(7, 'bob@example.com'),
(8, 'bob@example.com'),
(9, 'jack@example.com');



-- create table which stores temporary ids
CREATE TABLE keep_temp_id AS
SELECT MIN(id) AS temp_id
FROM person 
GROUP BY email 
HAVING COUNT(email) >= 1;

DROP TABLE keep_temp_id;

SELECT * FROM  keep_temp_id;

SELECT * FROM person;

-- delete duplicate email
DELETE FROM person
WHERE id NOT IN (
    SELECT temp_id
    FROM keep_temp_id
);

