-- Create the "books" table
CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    publication_year INT
);

-- Insert sample data into the "books" table
INSERT INTO books (id, title, author, publication_year)
VALUES
(1, '80 days around the world', 'J.D. Salinger', 1951),
(2, 'To Kill a Mockingbird', 'Harper Lee', 1960),
(3, '1984', 'George Orwell', 1949),
(4, 'Pride and Prejudice', 'Jane Austen', 1813);

-- get the data of oldest book
SELECT * FROM books
ORDER BY publication_year
LIMIT 1;
