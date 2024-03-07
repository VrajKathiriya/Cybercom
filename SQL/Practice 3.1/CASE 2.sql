-- create inventory table
CREATE TABLE inventory (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    category VARCHAR(50)
);

-- insert values into inventory table
INSERT INTO inventory 
(id, name, quantity, price, category) 
VALUES
(1, 'Laptop', 10, 999.99, 'Electronics'),
(2, 'Printer', 5, 299.99, 'Electronics'),
(3, 'Desk Chair', 20, 79.99, 'Furniture'),
(4, 'Notebook', 50, 4.99, 'Stationery'),
(5, 'Wireless Mouse', 15, 24.99, 'Electronics');

-- Write a query to retrieve the name and price of all items in the inventory
-- where the quantity is greater than 0 and the category is 'electronics', sorted in descending order by price.
SELECT name, price
FROM inventory
WHERE quantity > 0 AND category = 'electronics'
ORDER BY price DESC;
