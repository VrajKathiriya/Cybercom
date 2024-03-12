-- create the cars table
CREATE TABLE cars (
    car_id INT PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(50),
    year INT,
    mileage INT,
    price DECIMAL(12,2),
    available BIT
);

-- create the customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone_number VARCHAR(20)
);

-- create the sales table
CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    car_id INT,
    customer_id INT,
    sale_date DATE,
    sale_price DECIMAL(10,2),
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- insert data into cars table
INSERT INTO cars 
(car_id, brand, model, year, mileage, price, available)
VALUES
(1, 'Toyota', 'Camry', 2019, 25000, 20000.00, 1),
(2, 'Honda', 'Civic', 2018, 30000, 18000.50, 1),
(3, 'Ford', 'Fusion', 2020, 20000, 22000.75, 0),
(4, 'Chevrolet', 'Malibu', 2017, 35000, 16000.80, 1),
(5, 'Nissan', 'Altima', 2019, 28000, 19500.25, 0),
(6, 'Hyundai', 'Elantra', 2018, 32000, 17000.50, 1),
(7, 'Kia', 'Optima', 2021, 15000, 24000.00, 1),
(8, 'Mazda', 'Mazda3', 2016, 38000, 15500.75, 0),
(9, 'Subaru', 'Impreza', 2022, 12000, 26000.50, 1),
(10, 'Volkswagen', 'Jetta', 2017, 30000, 17500.00, 0),
(11, 'BMW', '3 Series', 2020, 18000, 35000.00, 1),
(12, 'Mercedes-Benz', 'C-Class', 2019, 22000, 40000.50, 1),
(13, 'Audi', 'A4', 2021, 15000, 38000.75, 0),
(14, 'Lexus', 'ES', 2018, 25000, 32000.80, 1),
(15, 'Infiniti', 'Q50', 2017, 28000, 28000.25, 0);

-- insert data into customers table
INSERT INTO customers 
(customer_id, first_name, last_name, email, phone_number)
VALUES
(101, 'Alice', 'Johnson', 'alice@example.com', '555-1234'),
(102, 'Bob', 'Smith', 'bob@example.com', '555-5678'),
(103, 'Charlie', 'Brown', 'charlie@example.com', '555-9876'),
(104, 'David', 'Miller', 'david@example.com', '555-4321'),
(105, 'Eva', 'Garcia', 'eva@example.com', '555-8765'),
(106, 'Frank', 'Jones', 'frank@example.com', '555-3456'),
(107, 'Grace', 'Taylor', 'grace@example.com', '555-6543'),
(108, 'Henry', 'Clark', 'henry@example.com', '555-7890'),
(109, 'Ivy', 'Williams', 'ivy@example.com', '555-2109'),
(110, 'Jack', 'Davis', 'jack@example.com', '555-9012');

-- insert data into sales table
-- Insert data into the "sales" table with adjusted IDs
INSERT INTO sales (sale_id, car_id, customer_id, sale_date, sale_price)
VALUES
(201, 1, 101, '2024-03-07', 22000.00),
(202, 3, 102, '2024-03-08', 28000.50),
(203, 5, 103, '2024-03-09', 19500.25),
(204, 1, 104, '2024-03-10', 24000.00),
(205, 1, 105, '2024-03-11', 18000.50),
(206, 2, 101, '2024-03-12', 17500.00),
(207, 4, 101, '2024-03-13', 16000.80),
(208, 9, 102, '2024-03-14', 26000.50),
(209, 3, 103, '2024-03-15', 17000.50),
(210, 4, 104, '2024-03-16', 15500.75);




-- 1.	Retrieve the top 10 most expensive cars from the Cars table.
SELECT * FROM cars
ORDER BY price DESC
LIMIT 10;

-- 2.	Retrieve the average price of all available cars from the Cars table.
SELECT AVG(price) AS average_price
FROM cars;

-- 3. Retrieve the list of customers who have purchased a car, 
-- along with the total number of cars each customer has purchased.
SELECT c.* ,COUNT(s.car_id) as total_cars
FROM customers c
LEFT JOIN sales s
ON c.customer_id = s.customer_id
GROUP BY c.customer_id
HAVING total_cars > 0;

-- 4.	Retrieve the list of customers who have not yet made a purchase.
SELECT c.* ,COUNT(s.car_id) as total_cars
FROM customers c
LEFT JOIN sales s
ON c.customer_id = s.customer_id
GROUP BY c.customer_id
HAVING total_cars = 0; 

-- 5.	Insert a new car into the Cars table with the following information:
--  Brand='Toyota', Model='Corolla', Year=2022, Mileage=0, Price=20000, Available=1.
INSERT INTO cars 
(car_id, brand, model, year, mileage, price, available)
VALUES (16,'Toyota', 'Corolla', 2022, 0, 20000, 1);

-- 6.	Update the price of all cars in the Cars table by adding 10% to their current price.
UPDATE cars
SET price = price + (price * 0.10);

-- 7.	Delete all sales from the Sales table that occurred before January 1, 2022.
DELETE FROM sales
WHERE sale_date < '2022-01-01';











