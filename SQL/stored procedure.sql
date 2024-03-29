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

-- one stored procedure with multiple action
DROP PROCEDURE handle_student;
DELIMITER //

CREATE PROCEDURE handle_student(
	IN action_type VARCHAR(50), 
    IN id INT,
    IN name VARCHAR(255),
    IN maths VARCHAR(255),
    IN physics VARCHAR(255),
    IN chemistry VARCHAR(255),
    IN new_value VARCHAR(255))
BEGIN
    IF action_type = 'select' THEN
        SET @sql_query = 'SELECT * FROM students;';
    ELSEIF action_type = 'update' AND maths IS NOT NULL THEN
        SET @sql_query = CONCAT('UPDATE students SET ', maths, ' = ', QUOTE(new_value), ' WHERE id = ', id, ';');
	ELSEIF action_type = 'update' AND physics IS NOT NULL THEN
        SET @sql_query = CONCAT('UPDATE students SET ', physics, ' = ', QUOTE(new_value), ' WHERE id = ', id, ';');
	ELSEIF action_type = 'update' AND chemistry IS NOT NULL THEN
        SET @sql_query = CONCAT('UPDATE students SET ', chemistry, ' = ', QUOTE(new_value), ' WHERE id = ', id, ';');
    ELSEIF action_type = 'insert' THEN
        INSERT INTO students 
        (id, name, maths, physics, chemistry) 
        VALUES (id, name, maths, physics, chemistry);
    ELSE
        SELECT 'Invalid action type';
    END IF;
    PREPARE stmt FROM @sql_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //
DELIMITER ;
SELECT * FROM students;

CALL handle_student('select');
CALL handle_student('select', NULL, NULL, NULL, NULL, NULL, NULL);
CALL handle_student('update', 4, NULL, 'maths', NULL, NULL , 100);
CALL handle_student('update', 3, NULL, NULL, 'physics', NULL, 98);


CALL handle_student('insert',7, 'sita', '45', '45', '55', NULL);

DROP PROCEDURE handle_student;
DELIMITER //

CREATE PROCEDURE handle_student(
	IN action_type VARCHAR(50), 
    IN column1 VARCHAR(255),
    IN column2 VARCHAR(255),
    IN new_value VARCHAR(255))
BEGIN
    IF action_type = 'select' THEN
        SET @sql_query = 'SELECT * FROM students;';
    ELSEIF action_type = 'update' THEN
        SET @sql_query = CONCAT('UPDATE students SET ', column1, ' = ', QUOTE(new_value), ' WHERE ', column2, ' = 3;');
    ELSEIF action_type = 'insert' THEN
        INSERT INTO another_table (column1, column2) VALUES ('value1', 'value2');
    ELSE
        SELECT 'Invalid action type';
    END IF;
    PREPARE stmt FROM @sql_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //
DELIMITER ;



