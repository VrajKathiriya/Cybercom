-- create table college
CREATE TABLE college(
college_id INT PRIMARY KEY,
college_name VARCHAR(50) NOT NULL
);

-- create table students
CREATE TABLE students(
student_id INT PRIMARY KEY,
student_name VARCHAR(50) NOT NULL,
college_id INT,
FOREIGN KEY (college_id) REFERENCES college(college_id)
);

-- insert values into college table
INSERT INTO college
(college_id, college_name)
VALUES
(101,'oxford'),
(102,'IIT Delhi'),
(103,'SVNIT Surat'),
(104,'IIM Ahmedabad'),
(105,'IIT Bombay');

-- insert values into students table 
INSERT INTO students
(student_id, student_name, college_id)
VALUES
(1,'vraj',101),
(2,'john',105),
(3,'munna',102),
(4,'ram',101),
(5,'sita',103),
(6,'gita',104);

SELECT * from students WHERE college_id = 101;







