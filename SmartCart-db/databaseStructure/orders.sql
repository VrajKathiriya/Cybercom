-- Create orders table
DROP TABLE orders;
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_percentage DECIMAL(10, 2) DEFAULT 0.00,
    delivery_charge DECIMAL(10, 2) DEFAULT 0.00,
    gst_percentage DECIMAL (10, 2) DEFAULT 0.00,
    net_amount DECIMAL (10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL, 
    delivery_address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_orders_user_id
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert data into orders table
INSERT INTO orders 
(user_id, order_date, total_amount, discount_percentage, delivery_charge, gst_percentage, net_amount, order_status, delivery_address)
VALUES
(1, '2024-03-22', 100.00, 10, 5.00, 5, 100.00, 'Pending', '123 Main St, New York, USA'),
(2, '2024-03-23', 150.00, 15, 7.00, 7, 134.50, 'Confirmed', '456 Elm St, Mumbai, India');

-- show all orders
SELECT * FROM orders;


-- Create order_details table
DROP TABLE order_details;
CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    sku_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_order_id
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_order_details_sku_id
    FOREIGN KEY (sku_id) REFERENCES skus(sku_id)
);

-- Insert data into order_details table
INSERT INTO order_details (order_id, sku_id, quantity, unit_price)
VALUES
(1, 1, 2, 45.00),  
(1, 2, 1, 10.00),  
(2, 3, 3, 30.00); 

-- show order details
SELECT * FROM order_details;

-- create stored procedure for manage orders
DROP PROCEDURE manage_orders;
DELIMITER //

CREATE PROCEDURE manage_orders(
    IN action INT,
    IN order_id_param INT,
    IN user_id_param INT,
    IN order_date_param DATE,
    IN total_amount_param DECIMAL(10, 2),
    IN discount_percentage_param DECIMAL(10, 2),
    IN delivery_charge_param DECIMAL(10, 2),
    IN gst_percentage_param DECIMAL(10, 2),
    IN net_amount_param DECIMAL(10,2),
    IN order_status_param VARCHAR(50),
    IN delivery_address_param VARCHAR(255)
)
BEGIN
	-- insert order
    DECLARE discount_amount DECIMAL(10,2);
    DECLARE gst_amount DECIMAL(10,2);
    SET discount_amount = total_amount_param * (discount_percentage_param / 100);
    SET gst_amount = total_amount_param * (gst_percentage_param / 100);
    
    IF action = 1 THEN
        INSERT INTO orders 
        (user_id, order_date, total_amount, discount_percentage, delivery_charge, gst_percentage, net_amount, order_status, delivery_address)
        VALUES 
        (user_id_param, order_date_param, total_amount_param, discount_percentage_param, delivery_charge_param, gst_percentage_param,
		total_amount_param - discount_amount + delivery_charge + gst_amount,
        order_status_param, delivery_address_param);
        
	-- insert order by id
    ELSEIF action = 2 THEN
        SELECT * FROM orders WHERE order_id = order_id_param;
	
    -- select all orders
    ELSEIF action = 3 THEN 
		SELECT * FROM orders;

	-- update order
    ELSEIF action = 4 THEN
        UPDATE orders
        SET user_id = user_id_param,
            order_date = order_date_param,
            total_amount = total_amount_param,
            discount_percentage = discount_percentage_param,
            delivery_charge = delivery_charge_param,
            gst_percentage = gst_percentage_param,
            net_amount = total_amount_param - discount_amount + delivery_charge + gst_amount,
            order_status = order_status_param,
            delivery_address = delivery_address_param,
            updated_at = CURRENT_TIMESTAMP
        WHERE order_id = order_id_param;
        
	-- delete order
    ELSEIF action = 5 THEN
        DELETE FROM orders WHERE order_id = order_id_param;
    ELSE
        SELECT 'Invalid action';
    END IF;
END //

DELIMITER ;

-- actions
-- 1. insert order
-- 2. select order by id
-- 3. select all orders
-- 4. update order
-- 5. delete order

-- action, order_id,  user_id, order_date, total_amount, discount_percentage, delivery_charge, gst_percentage, net_amount, order_status, delivery_address
-- insert order
CALL manage_orders(1, NULL, 2, '2024-03-25', 150.00, 10, 5.00, 8, NULL, 'Pending', 'India');

-- select order
CALL manage_orders(2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- select all orders
CALL manage_orders(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- update order
CALL manage_orders(4, 4, 2, '2024-03-25', 150.00, 20, 5.00, 8, NULL, 'Pending', 'USA');

-- delete order
CALL manage_orders(5, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);






