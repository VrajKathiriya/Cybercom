-- Create shopping_carts table
CREATE TABLE shopping_carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_id
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert data into shopping_carts table
INSERT INTO shopping_carts (user_id, total_amount) VALUES
(1, 0.00),  
(2, 0.00),
(3, 0.00); 

-- show carts of all users
SELECT * FROM shopping_carts;

-- Create cart_items table
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    sku_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_cart_id
    FOREIGN KEY (cart_id) REFERENCES shopping_carts(cart_id),
    CONSTRAINT fk_sku_id
    FOREIGN KEY (sku_id) REFERENCES skus(sku_id)
);

-- Insert data into cart_items table
INSERT INTO cart_items (cart_id, sku_id, quantity, unit_price) VALUES
(1, 1, 2, 10.99),  
(1, 2, 1, 5.99),   
(2, 3, 3, 8.50),   
(2, 4, 1, 12.49),
(3, 5, 10, 12.21); 

-- show cart items of each users
SELECT * FROM cart_items;

-- create stored procedure for manage shopping cart
DELIMITER //

CREATE PROCEDURE manage_shopping_carts(
    IN action INT,
    IN cart_id_param INT,
    IN user_id_param INT,
    IN total_amount_param DECIMAL(10, 2)
)
BEGIN
	-- insert cart
    IF action = 1 THEN
        INSERT INTO shopping_carts (user_id, total_amount)
        VALUES (user_id_param, total_amount_param);
        
	-- select cart by id
    ELSEIF action = 2 THEN
        SELECT * FROM shopping_carts WHERE cart_id = cart_id_param;
        
	-- select all carts
    ELSEIF action = 3 THEN
		SELECT * FROM shopping_carts;
        
	-- update cart
    ELSEIF action = 4 THEN
        UPDATE shopping_carts
        SET user_id = user_id_param,
            total_amount = total_amount_param,
            updated_at = CURRENT_TIMESTAMP
        WHERE cart_id = cart_id_param;
        
	-- delete cart
    ELSEIF action = 5 THEN
        DELETE FROM shopping_carts WHERE cart_id = cart_id_param;
        
    ELSE
        SELECT 'Invalid action';
    END IF;
END //

DELIMITER ;

-- create stored procedure for cart_items
DELIMITER //

CREATE PROCEDURE manage_cart_items(
    IN action INT,
    IN cart_item_id_param INT,
    IN cart_id_param INT,
    IN sku_id_param INT,
    IN quantity_param INT,
    IN unit_price_param DECIMAL(10, 2)
)
BEGIN
	-- insert cart item
    IF action = 1 THEN
        INSERT INTO cart_items (cart_id, sku_id, quantity, unit_price)
        VALUES (cart_id_param, sku_id_param, quantity_param, unit_price_param);
        
	-- select cart item by id
    ELSEIF action = 2 THEN
        SELECT * FROM cart_items WHERE cart_item_id = cart_item_id_param;
	
    -- select all cart items
    ELSEIF action = 3 THEN
		SELECT * FROM cart_items;
	
    -- update cart item
    ELSEIF action = 4 THEN
        UPDATE cart_items
        SET cart_id = cart_id_param,
            sku_id = sku_id_param,
            quantity = quantity_param,
            unit_price = unit_price_param,
            updated_at = CURRENT_TIMESTAMP
        WHERE cart_item_id = cart_item_id_param;
        
	-- delete cart item
    ELSEIF action = 5 THEN
        DELETE FROM cart_items WHERE cart_item_id = cart_item_id_param;
    ELSE
        SELECT 'Invalid action';
    END IF;
END //

DELIMITER ;

-- actions
-- 1. insert cart
-- 2. select cart by id
-- 3. select all carts
-- 4. update cart
-- 5. delete cart

-- action, cart_id, user_id, total_amount
-- insert cart
CALL manage_shopping_carts(1, NULL, 1, 210.00);

-- select cart by id
CALL manage_shopping_carts(2, 4, NULL, NULL);

-- select all carts
CALL manage_shopping_carts(3, NULL, NULL, NULL);

-- update cart
CALL manage_shopping_carts(4, 4, 1, 110.00);

-- delete cart
CALL manage_shopping_carts(5, 4, NULL, NULL);

-- actions
-- 1. insert cart item
-- 2. select cart item by id
-- 3. select all cart items
-- 4. update cart item
-- 5. delete cart item

-- action, cart_item_id, cart_id, sku_id, quantity, unit_price
-- insert cart item
CALL manage_cart_items(1, NULL, 1, 7, 2, 11);

-- select cart item by id
CALL manage_cart_items(2, 6, NULL, NULL, NULL, NULL);

-- select all cart items
CALL manage_cart_items(3, NULL, NULL, NULL, NULL, NULL);

-- update cart item
CALL manage_cart_items(4, 5, 1, 7, 2, 12);

-- delete cart item
CALL manage_cart_items(5, 6, NULL, NULL, NULL, NULL);
