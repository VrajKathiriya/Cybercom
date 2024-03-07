-- create world table
CREATE TABLE world(
name VARCHAR(100) PRIMARY KEY,
continent VARCHAR(100),
area INT,
population INT,
gdp BIGINT
);

DROP TABLE world;

-- insert values into world table
INSERT INTO world 
(name, continent, area, population, gdp)
VALUES
('Afghanistan', 'Asia', 652230, 25500100, 20343000000),
('Albania', 'Europe', 28748, 2831741, 12960000000),
('Algeria', 'Africa', 2381741, 37100000, 188681000000),
('Andorra', 'Europe', 468, 78115, 3712000000),
('Angola', 'Africa', 1246700, 20609294, 100990000000);

-- select countries which are big
SELECT name, population, area 
FROM world
WHERE population >= 25000000 OR area >= 30000000;

