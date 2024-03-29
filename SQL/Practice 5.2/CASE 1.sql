-- data in practice 5.1
DROP TABLE order_details2;
CREATE TABLE order_details2 (
    order_id INT PRIMARY KEY,
    quantity INT,
    unit_price DECIMAL(10,2),
    employee_id INT,
    customer_id INT,
    product_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO order_details2 
(order_id, quantity, unit_price, employee_id, customer_id,  product_id) 
VALUES
(1, 5, 49.99, 1, 1, 101),
(2, 3, 29.99, 2, 1, 102),
(3, 2, 99.99, 3, 1, 103),
(4, 1, 149.99, 4, 2, 104),
(5, 4, 79.99, 5, 3, 105),
(6, 2, 199.99, 5, 4, 101),
(7, 3, 149.99, 5, 5, 101),
(8, 5, 39.99, 2, 5, 102),
(9, 2, 129.99, 2, 2, 103),
(10, 1, 89.99, 1, 4, 104);


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
ORDER BY total_revenue DESC;

-- 3.	Write a SQL query to retrieve the names of all customers who have placed orders for products in both the "Electronics" and "Clothing" 
-- categories. The output should only include customers who have ordered products in both categories.
SELECT c.first_name, c.last_name, GROUP_CONCAT(DISTINCT p.category) AS category
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN products p
ON p.product_id = o.product_id
GROUP BY c.customer_id
HAVING COUNT(DISTINCT CASE WHEN p.category = 'Electronics' THEN o.id END) > 0
   AND COUNT(DISTINCT CASE WHEN p.category = 'Clothing' THEN o.id END) > 0;

-- 4.	Write a SQL query to retrieve the names of all employees who have sold at least one product to a customer 
-- who has a shipping address in the same city as the employee. The output should only include employees who have made at least one such sale
SELECT e.employee_name
FROM employees e
JOIN order_details2 od ON e.employee_id = od.employee_id
JOIN customers c ON od.customer_id = c.customer_id
WHERE e.country_name = c.country_name;

-- 5.	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, 
-- but have never placed an order for products in the "Clothing" category
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN products p
ON p.product_id = o.product_id
GROUP BY c.customer_id
HAVING COUNT(DISTINCT CASE WHEN p.category = 'Electronics' THEN o.id END) > 0
   AND COUNT(DISTINCT CASE WHEN p.category = 'Clothing' THEN o.id END) = 0;
   
-- 6.	Write a SQL query to retrieve the names of all employees who have sold at least one product to customers 
-- who have placed orders for products in the "Electronics" category, but have never placed an order for products in the "Clothing" category. 
-- The output should only include employees who have made at least one such sale
SELECT DISTINCT e.employee_name
FROM order_details2 od
JOIN employees e
ON e.employee_id = od.employee_id
WHERE od.customer_id IN(
	SELECT c.customer_id
	FROM customers c		
	JOIN orders o
	ON c.customer_id = o.customer_id
	JOIN products p
	ON p.product_id = o.product_id
	GROUP BY c.customer_id
	HAVING COUNT(DISTINCT CASE WHEN p.category = 'Electronics' THEN o.id END) > 0
		AND COUNT(DISTINCT CASE WHEN p.category = 'Clothing' THEN o.id END) = 0
);

-- 7.	Write a SQL query to retrieve the names of all customers who have placed orders 
-- for more than five different products in the "Electronics" category
SELECT c.first_name, c.last_name
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN products p ON o.product_id = p.product_id
WHERE p.category = 'Electronics'
GROUP BY c.customer_id
HAVING COUNT(DISTINCT o.product_id) > 5;

-- 8.	Write a SQL query to retrieve the names of all employees who have sold products to customers who have placed orders for more than five different 
-- products in the "Electronics" category. The output should only include employees who have made at least one such sale
SELECT DISTINCT e.employee_name
FROM employees e
JOIN order_details2 od ON e.employee_id = od.employee_id
JOIN products p ON od.product_id = p.product_id
JOIN customers c ON od.customer_id = c.customer_id
WHERE p.category = 'Electronics'
GROUP BY e.employee_id
HAVING COUNT(DISTINCT od.product_id) > 5;


