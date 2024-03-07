-- create table users
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP
);

-- create table posts
CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP
);

-- create table likes
CREATE TABLE likes (
    id INT PRIMARY KEY,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP
);

-- Insert data into users table
INSERT INTO users 
(id, name, created_at)
VALUES
(101, 'Vraj Kathiriya', '2022-03-07 12:00:00'),
(102, 'Decoster Sharma', '2022-02-09 12:15:00'),
(103, 'John Doe', '2022-01-03 12:30:00');

-- Insert data into posts table
INSERT INTO posts (id, user_id, body, created_at)
VALUES
(1, 101, 'This is the body of the first post.', '2022-04-08 13:00:00'),
(2, 102, 'This is the body of the second post.', '2022-02-09 13:30:00'),
(3, 102, 'This is the body of the third post.', '2022-02-15 14:00:00'),
(4, 103, 'This is the body of the fourth post.', '2022-02-15 15:00:00');

-- Insert data into likes table
INSERT INTO likes (id, user_id, post_id, created_at)
VALUES
(1, 102, 1, '2022-05-07 13:15:00'),
(2, 103, 1, '2022-05-08 13:30:00'),
(3, 101, 2, '2022-03-07 14:00:00'),
(4, 102, 2, '2022-03-09 14:15:00'),
(5, 103, 3, '2022-02-07 14:30:00');

-- Write a query to retrieve the name and number of posts for each user who joined the platform in the year 2022,
-- along with the total number of likes received for each user's posts.
SELECT u.name  , p.body, count(l.id)  AS total_likes
FROM users AS u
LEFT JOIN posts AS p
ON u.id = p.user_id AND YEAR(p.created_at) = '2022'
LEFT JOIN likes l
ON p.id = l.post_id 
GROUP BY  u.id, p.id ;





