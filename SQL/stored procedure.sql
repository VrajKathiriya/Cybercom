CREATE DATABASE practice;

USE practice;

-- create students table
DROP TABLE students;
CREATE TABLE students(
	id INT PRIMARY KEY,
    name VARCHAR(100),
    class VARCHAR(10),
    maths INT,
    physics INT,
    chemistry INT,
    total INT
);

-- insert data into students table
TRUNCATE TABLE students;
INSERT INTO students
(id, name, class, maths, physics, chemistry)
VALUES
(3, 'vraj', 'A', 99, 89, 67),
(4, 'ram', 'B', 89, 78, 34);

-- create stored procedure for get all students
DELIMITER //
CREATE PROCEDURE get_all_students()
BEGIN
	SELECT * FROM students;
END; //
DELIMITER ;

CALL get_all_students();

-- create stored procedure with input parameter
DELIMITER //
CREATE PROCEDURE get_student(IN std_id INT)
BEGIN
	SELECT * FROM students WHERE id = std_id;
END; //
DELIMITER ;

CALL get_student(1);

-- create stored procedure with out parameter
DELIMITER //
CREATE PROCEDURE get_total_students(OUT total_students INT)
BEGIN
	DECLARE total_count INT;
	SELECT COUNT(*) INTO total_count FROM students;
    SET total_students = total_count;
END; //
DELIMITER ;

CALL get_total_students(@total);
SELECT @total AS total_students;


