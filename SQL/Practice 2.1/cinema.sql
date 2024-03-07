-- create table cinema
CREATE TABLE cinema(
id INT PRIMARY KEY ,
movie VARCHAR(100),
description VARCHAR(200),
rating DECIMAL(4,2) CHECK(rating >= 0 AND rating <= 10) 
);

-- inserting data into cinema table
INSERT INTO cinema (id, movie, description, rating) VALUES
(1, 'War', 'Great 3D', 8.9),
(2, 'Science', 'Fiction', 8.5),
(3, 'Irish', 'Boring', 6.2),
(4, 'Ice song', 'Fantasy', 8.6),
(5, 'House card', 'Interesting', 9.1);

-- select all movies where id is odd and description is not equal to boring
SELECT * FROM cinema WHERE id % 2 <> 0 AND description <> 'boring' ORDER BY rating DESC; 














