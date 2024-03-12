-- data in practice 5.1
CREATE TABLE order_details2 (
    order_id INT PRIMARY KEY,
    quantity INT,
    unit_price DECIMAL(10,2),
    employee_id INT,
    product_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO order_details2 
(order_id, quantity, unit_price, employee_id, product_id) 
VALUES
(1, 5, 49.99, 1, 101),
(2, 3, 29.99, 2, 102),
(3, 2, 99.99, 3, 103),
(4, 1, 149.99, 4, 104),
(5, 4, 79.99, 5, 105),
(6, 2, 199.99, 5, 101),
(7, 3, 149.99, 5, 101),
(8, 5, 39.99, 2, 102),
(9, 2, 129.99, 2, 103),
(10, 1, 89.99, 1, 104);


-- 1.	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category,
-- along with the total amount they have spent on all orders. The output should be sorted by the total amount spent in descending order.
SELECT c.customer_id, ROUND(SUM(o.amount),2) AS total_amount
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN products p
ON p.product_id = o.product_id
WHERE category = 'Electronics'
GROUP BY c.customer_id
ORDER BY total_amount DESC;

-- 2.	Write a SQL query to retrieve the names of all employees who have sold at least one product in the "Clothing" category, 
-- along with the total revenue they have generated from those sales. The output should be sorted by total revenue generated in descending order.
SELECT e.employee_id, e.employee_name, SUM(od.quantity * od.unit_price) AS total_revenue
FROM employees e
JOIN order_details2 od
ON e.employee_id = od.employee_id
JOIN products p
ON p.product_id = od.product_id
WHERE p.category = 'Clothing'
GROUP BY e.employee_id, e.employee_name
HAVING COUNT(p.category) > 0
ORDER BY total_revenue DESC;

-- 3.	Write a SQL query to retrieve the names of all customers who have placed orders for products in both the "Electronics" and "Clothing" 
-- categories. The output should only include customers who have ordered products in both categories.