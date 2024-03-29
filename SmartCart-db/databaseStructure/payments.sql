-- Create payments table
DROP TABLE payments;
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL, 
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payment_order_id
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Insert data into payments table
INSERT INTO payments 
(order_id, payment_date, payment_method, amount, payment_status)
VALUES
(1, '2024-03-23 12:34:56', 'Credit Card', 100.00, 'Paid'), 
(2, '2024-03-24 09:12:34', 'PayPal', 134.50, 'Paid');  

-- show payments details
SELECT * FROM payments;   