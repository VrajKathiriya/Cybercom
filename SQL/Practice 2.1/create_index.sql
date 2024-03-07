-- create person_email table
CREATE TABLE person_email(
id INT PRIMARY KEY,
email VARCHAR(100)
);

-- insert values into table
INSERT INTO person_email (id, email) VALUES
(1, 'joe@gmail.com'),
(2, 'bob@gmail.com'),
(3, 'vraj@gmail.com'),
(4, 'ram@yahoo.com'),
(5, 'sita@gmail.com');

CREATE INDEX idx_email ON person_email(email);
DROP INDEX idx_email ON person_email;

SELECT * FROM person_email;

SHOW INDEX FROM person_email;