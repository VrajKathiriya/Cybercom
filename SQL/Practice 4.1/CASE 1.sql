-- create the authors table
CREATE TABLE authors (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- create the books table
CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    publication_date DATE,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

-- create the book_categories table
CREATE TABLE book_categories (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- create the book_category_mappings table
CREATE TABLE book_category_mappings (
    id INT PRIMARY KEY,
    book_id INT,
    category_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (category_id) REFERENCES book_categories(id)
);

-- insert data into the authors table
INSERT INTO authors (id, name) VALUES
(101, 'Author 1'),
(102, 'Author 2'),
(103, 'Author 3'),
(104, 'Author 4'),
(105, 'Author 5');

-- insert data into the book_categories table
INSERT INTO book_categories (id, name) VALUES
(1, 'Fiction'),
(2, 'Non-Fiction'),
(3, 'Science Fiction'),
(4, 'Mystery'),
(5, 'Romance');

-- insert data into the books table
INSERT INTO books (id, title, author_id, publication_date) VALUES
(201, 'Book 1', 101, '2022-01-01'),
(202, 'Book 2', 102, '2020-02-15'),
(203, 'Book 3', 103, '2020-03-10'),
(204, 'Book 4', 104, '2022-04-20'),
(205, 'Book 5', 105, '2022-05-05'),
(206, 'Book 6', 101, '2020-06-15'),
(207, 'Book 7', 101, '2021-07-20'),
(208, 'Book 8', 102, '2021-08-25'),
(209, 'Book 9', 102, '2020-09-30'),
(210, 'Book 10', 102, '2022-10-10');

-- Insert data into the book_category_mappings table
INSERT INTO book_category_mappings (id, book_id, category_id) VALUES
(301, 201, 1),
(302, 202, 2),
(303, 203, 3),
(304, 204, 4),
(305, 205, 5),
(306, 201, 1),
(307, 202, 2),
(308, 203, 3),
(309, 201, 4),
(310, 201, 5);

-- 1.	Write a query to find all books published in the year 2020.
SELECT * FROM books 
WHERE YEAR(publication_date) = 2020;

-- 2.	Write a query to find the name of the author who has written the most number of books.
SELECT a.name AS author_name, COUNT(b.id) AS total_books
FROM authors a
LEFT JOIN books b
ON a.id = b.author_id
GROUP BY a.id
ORDER BY total_books DESC
LIMIT 1;

-- 3.	Write a query to find the name of the category with the most number of books
SELECT c.name, COUNT(b.book_id) AS total_books
FROM book_categories as c
LEFT JOIN book_category_mappings b
ON c.id = b.category_id
GROUP BY c.name
ORDER BY total_books DESC
LIMIT 1;

-- 4.	Write a query to find the name of the author who has written the most number of books in the category "fiction".
SELECT a.name AS author_name, COUNT(b.id) AS book_count
FROM authors a
JOIN books b 
ON a.id = b.author_id
JOIN book_category_mappings m 
ON b.id = m.book_id
JOIN book_categories c 
ON m.category_id = c.id
WHERE c.name = 'fiction'
GROUP BY a.id
ORDER BY book_count DESC
LIMIT 1;

-- 5.Write a query to find the titles of the top 5 most popular books. 
-- The popularity of a book is defined as the number of times it has been borrowed by customers

-- create the book_borrowings table
CREATE TABLE book_borrowings (
    id INT PRIMARY KEY,
    book_id INT,
    customer_id INT,
    borrow_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Insert data into the book_borrowings table
INSERT INTO book_borrowings (id, book_id, customer_id, borrow_date) VALUES
(1, 201, 101, '2022-01-01'),
(2, 202, 102, '2022-02-15'),
(3, 203, 103, '2022-03-10'),
(4, 204, 104, '2022-04-20'),
(5, 205, 105, '2022-05-05'),
(6, 202, 101, '2022-06-15'),
(7, 202, 101, '2022-07-20'),
(8, 202, 101, '2022-08-25'),
(9, 204, 101, '2022-09-30'),
(10, 204, 102, '2022-10-10');

SELECT  bb.book_id, COUNT(bb.id) AS total_borrow
FROM books b
RIGHT JOIN book_borrowings bb
ON b.id = bb.book_id
GROUP BY bb.book_id
ORDER BY total_borrow DESC
LIMIT 5;







