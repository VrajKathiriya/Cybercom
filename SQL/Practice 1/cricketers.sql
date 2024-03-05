-- enable updating
SET SQL_SAFE_UPDATES = 0;

-- create cricketers table
CREATE TABLE cricketers(
id INT PRIMARY KEY AUTO_INCREMENT,
Name VARCHAR(255) NOT NULL,
Country VARCHAR(255),
Age INT CHECK (Age >= 10 AND Age <= 120),
Experiance VARCHAR(20),
Role VARCHAR(50),
Rating VARCHAR(50)
);

-- insert values into cricketers table
INSERT INTO cricketers
(Name, Country, Age, Experiance, Role, Rating)
VALUES
('Virat Kohli', 'India', 35, 15, 'batsman', 987),
('Ms Dhoni','India',40,20,'wk-batsman',923),
('ABD','South Africa',37,13,'batsman',922),
('Maxwell', 'Australia',33,12,'all-rounder',899),
('Cummins','Australia',33,11,'bowler',888),
('Bumraah','India',34,11,'bowler',945),
('Shami','India',34,11,'bowler',910),
('Conwey','New Zeland',26,8,'batsman',820),
('Boult','Nwe Zeland',29,9,'bowler',799),
('Bravo','West Indies',36,13,'all-rounder',744),
('Gill','India',25,5,'batsman',873),
('Rohit Sharma','India',35,14,'batsman',920),
('Morgan','England',40,23,'batsman',764),
('Stockes','England',34,10,'all-rounder',895),
('Root','England',33,12,'batsman',821),
('Jadeja','India',31,10,'all-rounder',911),
('Guptil','New Zeland',38,14,'batsman',721),
('Marsh','Australia',29,9,'all-rounder',821),
('Starc','Australia',31,10,'bowler',934),
('Markram','South Africa',31,5,'all-rounder',882);

-- add grade column in table
ALTER TABLE cricketers 
ADD COLUMN grade VARCHAR(20);

-- set grade accordingly ratings
UPDATE cricketers
SET grade = 'E'
WHERE ratings BETWEEN 700 AND 749;


-- delete one cricketer 
DELETE FROM cricketers WHERE id=10;

-- select all cricketers
SELECT * FROM cricketers;

