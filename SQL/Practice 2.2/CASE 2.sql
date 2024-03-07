-- create ciurses table
CREATE TABLE courses(
	student VARCHAR(5),
    class VARCHAR(50)
);

-- insert values into corses table
INSERT INTO courses
(student, class) 
VALUES
('A', 'Math'),
('B', 'English'),
('C', 'Math'),
('D', 'Biology'),
('E', 'Math'),
('F', 'Computer'),
('G', 'Math'),
('H', 'Math'),
('I', 'Math');

-- select class which have atleast five students
SELECT class
FROM courses
GROUP BY class
HAVING COUNT(student) >= 5 ;










