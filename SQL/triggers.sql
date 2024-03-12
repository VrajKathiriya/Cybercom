-- create trigger for insert
DROP TRIGGER before_insert_marks;
DELIMITER //
CREATE TRIGGER before_insert_marks
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
	SET NEW.total = new.maths + new.physics + new.chemistry;
END; //
DELIMITER ;

INSERT INTO students
(id, name, maths, physics, chemistry)
VALUES
(21, 'ram', 45,56,34); 
SELECT * FROM students;

-- create after insert marks trigger
DELIMITER // 
CREATE TRIGGER after_insert_marks
AFTER INSERT ON students
FOR EACH ROW
BEGIN 
	UPDATE average_marks_of_all_students
    SET average_marks = (SELECT AVG(total) FROM students);
END; //
DELIMITER ;

-- create trigger for update marks
DELIMITER //
CREATE TRIGGER before_update_marks
BEFORE UPDATE ON students
FOR EACH ROW
BEGIN
	SET NEW.total = NEW.maths + NEW.physics + NEW.chemistry;
END; //
DELIMITER ; 

UPDATE students
SET maths = 10
WHERE id = 3;

-- create trigger for after_updates_marks
DELIMITER //
CREATE TRIGGER after_update_marks
AFTER UPDATE ON students
FOR EACH ROW
BEGIN
	UPDATE average_marks_of_all_students
    SET average_marks = (SELECT AVG(total) FROM students);
END; //
DELIMITER ;

-- create trigger after_delete_student
DELIMITER //
CREATE TRIGGER after_delete_student
AFTER DELETE ON students
FOR EACH ROW
BEGIN
	UPDATE average_marks_of_all_students
    SET average_marks = (SELECT AVG(total) FROM students);
END;//
DELIMITER ;

DELETE FROM students
WHERE id = 21;


-- create table which stores average total
DROP TABLE average_marks_of_all_students;
CREATE TABLE average_marks_of_all_students(
	average_marks DECIMAL(10,2)
);
SELECT * FROM students;
SELECT * FROM average_marks_of_all_students;