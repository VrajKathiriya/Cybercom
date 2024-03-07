-- create table activity
CREATE TABLE activity(
	player_id INT,
    device_id INT,
    event_date DATE,
    games_played INT,
    PRIMARY KEY (player_id, event_date)
);

-- insert data into activity table
INSERT INTO activity
(player_id, device_id, event_date, games_played)
VALUES
(1, 2, '2016-03-01', 5),
(1, 2, '2016-05-02', 6),
(1, 3, '2017-06-25', 1),
(3, 1, '2016-03-02', 0),
(3, 4, '2018-07-03', 5);


-- Question 1: Write an SQL query to report the first login date for each player. 
SELECT player_id, MIN(event_date) AS first_login
FROM activity
GROUP BY player_id;

-- Question 2: Write an SQL query to report the device that is first logged in for each player. 
SELECT player_id, device_id
FROM activity
WHERE (player_id, event_date) IN (
	SELECT player_id, MIN(event_date) 
	FROM activity
	GROUP BY player_id
);

-- Question 3: Write an SQL query to report for each player and date, how many games played so far by the player. 
-- That is, the total number of games played by the player until that date. Check the example for clarity. 
SELECT 
player_id,event_date,
SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far
FROM activity;



