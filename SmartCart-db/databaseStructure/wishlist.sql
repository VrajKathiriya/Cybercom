-- create wishlist table
CREATE TABLE wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_wi_user_id
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- insert data into wishlist table
TRUNCATE TABLE wishlist;
INSERT INTO wishlist (user_id, created_at, updated_at)
VALUES
(1, NOW(), NOW()),  
(2, NOW(), NOW());


-- create table wishlist_items
DROP TABLE wishlist_items;
CREATE TABLE wishlist_items (
    wishlist_item_id INT AUTO_INCREMENT PRIMARY KEY,
    wishlist_id INT NOT NULL,
    product_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_wishlist_id
    FOREIGN KEY (wishlist_id) REFERENCES wishlist(wishlist_id),
    
    CONSTRAINT fk_wi_product_id
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- insert data into wishlist items
INSERT INTO wishlist_items (wishlist_id, product_id, added_at)
VALUES
(1, 1, NOW()),  
(1, 2, NOW()),  
(2, 3, NOW());

