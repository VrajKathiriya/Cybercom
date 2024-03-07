-- create students table
CREATE TABLE students(
student_id INT PRIMARY KEY,
name VARCHAR(255),
birth_date DATE,
gender VARCHAR(10)
);

-- create semester table
CREATE TABLE semesters(
semester_id INT PRIMARY KEY,
semester_name VARCHAR(20)
);

-- create students_grade table
CREATE TABLE students_grade(
grade_id INT PRIMARY KEY,
student_id INT,
semester_id INT,
grade DECIMAL(3,2),
FOREIGN KEY (student_id) REFERENCES students(student_id),
FOREIGN KEY (semester_id) REFERENCES semesters(semester_id)
);

-- insert values into students table
INSERT INTO students
(student_id, name, birth_date, gender) 
VALUES
(1, 'Vraj Kathiriya', '2002-05-15', 'Male'),
(2, 'Jennifer Johnson', '2001-08-22', 'Female'),
(3, 'Jessica Johnson', '1999-03-10', 'Female'),
(4, 'John Smith', '2002-11-05', 'Male'),
(5, 'David Miller', '2000-07-18', 'Male');

-- insert values into semesters table
INSERT INTO semesters (semester_id, semester_name) VALUES
(101, 'Winter 2023'),
(102, 'Summer 2023'),
(103, 'Winter 2024'),
(104, 'Summer 2024'),
(105, 'Winter 2025'),
(106, 'Summer 2025');

-- insert values into students_grade table
INSERT INTO students_grade 
(grade_id, student_id, semester_id, grade) 
VALUES
(201, 1, 101, 9.50),
(202, 2, 101, 8.75),
(203, 3, 102, 2.00),
(204, 4, 102, 8.25),
(205, 5, 103, 9.50),
(206, 1, 103, 6.75),
(207, 2, 104, 5.00),
(208, 3, 104, 1.25),
(209, 4, 105, 7.00),
(210, 5, 105, 9.25);

SELECT * FROM students_grade;







