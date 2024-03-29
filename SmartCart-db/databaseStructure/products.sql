-- Create categories table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT
);

-- Insert data into categories table
INSERT INTO categories 
(category_name, category_description) 
VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Apparel and fashion accessories'),
('Books', 'Books and literature');

-- show categories
SELECT * FROM categories;

-- Create products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_category_id
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- add soft delete to products
ALTER TABLE products
ADD COLUMN is_deleted TINYINT(1) DEFAULT 0;

-- Insert data into products table
INSERT INTO products 
(category_id, product_name, product_description, price, stock_quantity)
VALUES
(1, 'Smartphone', 'A high-quality smartphone with advanced features', 599.99, 100),
(1, 'Laptop', 'A powerful laptop for work and entertainment', 999.99, 50),
(2, 'T-Shirt', 'Comfortable and stylish cotton T-shirt', 19.99, 200),
(2, 'Jeans', 'Classic denim jeans for everyday wear', 39.99, 150),
(3, 'Programming in Python', 'A comprehensive guide to Python programming', 29.99, 50),
(3, 'The Great Gatsby', 'A classic novel by F. Scott Fitzgerald', 9.99, 100);

-- show all products
SELECT * FROM products;

-- Create skus table
CREATE TABLE skus (
    sku_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    sku_code VARCHAR(50) NOT NULL,
    variant_description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_product_id
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert data into skus table
INSERT INTO skus (product_id, sku_code, variant_description, price, stock_quantity)
VALUES
(1, 'SM001', 'Color: Black', 599.99, 50),
(1, 'SM002', 'Color: White', 599.99, 50),
(2, 'LT001', 'Model: XYZ', 999.99, 50),
(2, 'LT002', 'Model: ABC', 999.99, 0),
(3, 'TS001', 'Size: S, Color: Black', 19.99, 100),
(3, 'TS002', 'Size: M, Color: White', 19.99, 100),
(4, 'JN001', 'Size: 30, Color: Blue', 39.99, 50),
(4, 'JN002', 'Size: 32, Color: Black', 39.99, 100),
(5, 'PP001', '', 29.99, 50),
(6, 'GB001', '', 9.99, 100);

-- show skus list
SELECT * FROM skus;

-- create store procedure for manage products
DROP PROCEDURE manage_products;
DELIMITER //

CREATE PROCEDURE manage_products(
    IN action INT,
    IN product_id_param INT,
    IN category_id_param INT,
    IN product_name_param VARCHAR(255),
    IN product_description_param TEXT,
    IN price_param DECIMAL(10, 2),
    IN stock_quantity_param INT
)
BEGIN
	-- insert product
    IF action = 1 THEN
        INSERT INTO products 
        (category_id, product_name, product_description, price, stock_quantity)
        VALUES 
        (category_id_param, product_name_param, product_description_param, price_param, stock_quantity_param);
        
	-- select product by product id
    ELSEIF action = 2 THEN
        SELECT * FROM products WHERE product_id = product_id_param;

	-- select active products
    ELSEIF action = 3 THEN
		SELECT * FROM products WHERE is_deleted = 0;
        
	-- select inactive products
    ELSEIF action = 4 THEN
		SELECT * FROM products WHERE is_deleted = 1;
	
    -- select all products
    ELSEIF action = 5  THEN
		SELECT * FROM products;
	
    -- update product
    ELSEIF action = 6 THEN
        UPDATE products
        SET category_id = category_id_param,
            product_name = product_name_param,
            product_description = product_description_param,
            price = price_param,
            stock_quantity = stock_quantity_param,
            updated_at = CURRENT_TIMESTAMP
        WHERE product_id = product_id_param;
        
	-- delete product
    ELSEIF action = 7 THEN
        UPDATE products SET is_deleted = 1 WHERE product_id = product_id_param;
	
    -- restore product
    ELSEIF action = 8 THEN
		UPDATE products SET is_deleted = 0 WHERE product_id = product_id_param;
        
    ELSE
        SELECT 'Invalid action';
    END IF;
END //

DELIMITER ;

-- create stored procedure for manage skus
DROP PROCEDURE manage_skus;
DELIMITER //

CREATE PROCEDURE manage_skus(
    IN action INT,
    IN sku_id_param INT,
    IN product_id_param INT,
    IN sku_code_param VARCHAR(50),
    IN variant_description_param VARCHAR(255),
    IN price_param DECIMAL(10, 2),
    IN stock_quantity_param INT
)
BEGIN
	-- insert sku
    IF action = 1 THEN
        INSERT INTO skus 
        (product_id, sku_code, variant_description, price, stock_quantity)
        VALUES 
        (product_id_param, sku_code_param, variant_description_param, price_param, stock_quantity_param);
        
	-- select sku by id
    ELSEIF action = 2 THEN
        SELECT * FROM skus WHERE sku_id = sku_id_param;
        
	-- select all skus
    ELSEIF action = 3 THEN 
		SELECT * FROM skus;
	
    -- update sku
    ELSEIF action = 4 THEN
        UPDATE skus
        SET product_id = product_id_param,
            sku_code = sku_code_param,
            variant_description = variant_description_param,
            price = price_param,
            stock_quantity = stock_quantity_param,
            updated_at = CURRENT_TIMESTAMP
        WHERE sku_id = sku_id_param;
        
	-- delete sku
    ELSEIF action = 5 THEN
        DELETE FROM skus WHERE sku_id = sku_id_param;
        
    ELSE
        SELECT 'Invalid action';
    END IF;
END //

DELIMITER ;


-- actions
-- 1. insert product
-- 2. select product by id
-- 3. select active products
-- 4. select inactive products
-- 5. select all products
-- 6. update products
-- 7. delete products
-- 8. restore products

--  action, product_id, category_id, product_name, product_description, price, stock_quantity

-- insert product
CALL manage_products(1, NULL, 1, 'i-pad', 'i-pad is big', 100.99, 10);

-- select product by id
CALL manage_products(2, 7, NULL, NULL, NULL, NULL, NULL);

-- select active products
CALL manage_products(3, NULL, NULL, NULL, NULL, NULL, NULL);

-- select inactive products
CALL manage_products(4, NULL, NULL, NULL, NULL, NULL, NULL);

-- select all products
CALL manage_products(5, NULL, NULL, NULL, NULL, NULL, NULL);

-- update product
CALL manage_products(6, 9, 1, 'i-pad pro', 'i-pad is big', 100.99, 10);

-- delete product
CALL manage_products(7, 9, NULL, NULL, NULL, NULL, NULL);

-- restore product
CALL manage_products(8, 9, NULL, NULL, NULL, NULL, NULL);


-- actions for sku table
-- 1. insert sku
-- 2. select sku by id
-- 3. select all skus
-- 4. update sku
-- 5. delete sku

-- action, sku_id, product_id, sku_code, variant_description, price, stock_quantity
-- insert sku
CALL manage_skus(1, NULL, 1, 'SKU001', 'Variant 1', 9.99, 50);

-- select sku
CALL manage_skus(2, 11, NULL, NULL, NULL, NULL, NULL);

-- select all skus
CALL manage_skus(3, NULL, NULL, NULL, NULL, NULL, NULL);

-- update sku
CALL manage_skus(4, 11 , 2, 'SKU001', 'Variant 1', 9.99, 50);

-- delete sku
CALL manage_skus(5, 11, NULL, NULL, NULL, NULL, NULL);























