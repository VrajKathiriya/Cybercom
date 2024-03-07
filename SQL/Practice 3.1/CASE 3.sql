-- create sales table
CREATE TABLE sales (
    id INT PRIMARY KEY,
    date DATE,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10,2)
);

-- insert values into sales table
INSERT INTO sales 
(id, date, customer_id, product_id, quantity, total_price) 
VALUES
(1, '2022-03-01', 101, 201, 3, 150.00),
(2, '2021-03-01', 102, 202, 2, 80.00),
(3, '2021-03-02', 103, 201, 5, 250.00),
(4, '2021-06-02', 101, 203, 1, 30.00),
(5, '2021-07-03', 102, 204, 4, 120.00),
(6, '2021-07-03', 104, 201, 2, 100.00),
(7, '2021-07-04', 103, 205, 3, 75.00),
(8, '2021-09-04', 101, 204, 1, 30.00),
(9, '2021-09-05', 104, 202, 5, 200.00),
(10, '2021-10-05', 102, 203, 2, 60.00);

-- Write a query to retrieve the total sales for each month in the year 2021,
-- sorted in ascending order by month.
SELECT MONTH(date) AS month ,SUM(total_price) AS sales
FROM sales
WHERE YEAR (date) = 2021
GROUP BY MONTH(date)
ORDER BY MONTH(date);





