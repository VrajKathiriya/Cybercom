-- create blog_posts table
CREATE TABLE blog_posts (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- create blog_comments table
CREATE TABLE blog_comments (
    id INT PRIMARY KEY,
    post_id INT,
    body TEXT,
    author_id INT,
    created_at TIMESTAMP
);

-- Insert data into blog_posts table
INSERT INTO blog_posts (id, title, body, author_id, created_at, updated_at)
VALUES
(1, 'First Post', 'This is the body of the first post.', 101, '2022-03-07 12:00:00', '2024-03-07 12:30:00'),
(2, 'Second Post', 'This is the body of the second post', 102, '2021-03-07 13:00:00', '2024-03-07 13:30:00'),
(3, 'Third Post', 'This is the body of the third post', 103, '2023-02-07 14:00:00', '2023-06-07 14:30:00'),
(4, 'Fourth Post', 'This is the body of the fourth post.', 101, '2024-02-07 15:00:00', '2024-02-07 15:30:00'),
(5, 'Fifth Post', 'This is the body of the fifth post', 102, '2021-03-07 16:00:00', '2022-02-07 16:30:00');

-- Insert data into blog_comments table
INSERT INTO blog_comments 
(id, post_id, body, author_id, created_at)
VALUES
(1, 1, 'Great post!', 201, '2024-03-07 12:15:00'),
(2, 1, 'Nice content!', 202, '2024-03-07 12:30:00'),
(3, 2, 'Very Nice', 201, '2024-03-07 13:15:00'),
(4, 3, 'Good post', 203, '2024-03-07 14:30:00'),
(5, 5, 'Not bad!', 202, '2024-03-07 16:15:00');


-- Write a query to retrieve the title and body of the five most recent blog posts,
-- along with the number of comments each post has.

SELECT bp.title, bp.body, COUNT(bc.id) AS count
FROM blog_posts AS bp
LEFT JOIN blog_comments AS bc 
ON bp.id = bc.post_id
GROUP BY bp.id
ORDER BY bp.created_at DESC
LIMIT 5;
