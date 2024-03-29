CREATE DATABASE smartcart;

USE smartcart;

-- create user_roles table
CREATE TABLE user_roles (
	user_role_id INT PRIMARY KEY,
    user_role_name VARCHAR(100)
);

-- Insert data into user_roles table
INSERT INTO user_roles
(user_role_id, user_role_name) 
VALUES
(1, 'Admin'),
(2, 'Customer'),
(3, 'Staff');

-- show roles
SELECT * FROM user_roles;

-- create users table
DROP TABLE users;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_role_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_to_user_roles
    FOREIGN KEY (user_role_id) REFERENCES user_roles(user_role_id)
);

-- add soft delete to users
ALTER TABLE users
ADD COLUMN is_deleted TINYINT(1) DEFAULT 0;

-- Insert data into users table
INSERT INTO users 
(user_role_id, username, email, password, first_name, last_name, date_of_birth, gender, phone)
VALUES
(1, 'admin', 'admin@example.com', 'admin123', 'Admin', 'User', '1990-01-01', 'Male', '1234567890'),
(2, 'customer1', 'customer1@example.com', 'c1@123', 'John', 'Doe', '1995-05-15', 'Male', '9876543210'),
(2, 'customer2', 'customer2@example.com', 'c2@123', 'Jane', 'Doe', '1993-09-25', 'Female', '5555555555');

-- show users
SELECT * FROM users;

-- create addresses table
DROP TABLE addresses;
CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    address_line1 VARCHAR(100) NOT NULL,
    address_line2 VARCHAR(100),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50),
    country VARCHAR(50) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT fk_to_user_id
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- Insert data into addresses table
TRUNCATE TABLE addresses;
INSERT INTO addresses 
(user_id, address_line1, city, state, country, is_primary)
VALUES
(1, '123 Admin Street', 'Amreli', 'Gujarat', 'India', TRUE),
(2, '456 Customer Street', 'New York city', 'New York', 'USA', TRUE),
(2, '789 Another Customer Street', 'Mumbai', 'Maharastra', 'India', FALSE);

-- show addresses
SELECT * FROM addresses;

-- create stored procedure for manage users
DROP PROCEDURE manage_users;
DELIMITER //

CREATE PROCEDURE manage_users(
    IN action INT, 
    IN user_id_param INT,
    IN user_role_id_param INT,
    IN username_param VARCHAR(50),
    IN email_param VARCHAR(100),
    IN password_param VARCHAR(255),
    IN first_name_param VARCHAR(50),
    IN last_name_param VARCHAR(50),
    IN date_of_birth_param DATE,
    IN gender_param ENUM('Male', 'Female', 'Other'),
    IN phone_param VARCHAR(20)
)
BEGIN
	-- insert user
    IF action = 1 THEN
        INSERT INTO users 
        (user_role_id, username, email, password, first_name, last_name, date_of_birth, gender, phone)
        VALUES 
        (user_role_id_param, username_param, email_param, password_param, first_name_param, last_name_param, date_of_birth_param, gender_param, phone_param);
        
	-- select user by id
    ELSEIF action = 2 THEN
        SELECT * FROM users WHERE user_id = user_id_param;
        
	-- select active users
    ELSEIF action = 3 THEN
		SELECT * FROM users WHERE is_deleted = 0;
        
	-- select inactive users
	ELSEIF action = 4 THEN
		SELECT * FROM users WHERE is_deleted = 1;
        
	-- select all users
    ELSEIF action = 5 THEN
		SELECT * FROM users;
        
	-- update user
    ELSEIF action = 6 THEN
        UPDATE users
        SET user_role_id = user_role_id_param,
            username = username_param,
            email = email_param,
            password = password_param,
            first_name = first_name_param,
            last_name = last_name_param,
            date_of_birth = date_of_birth_param,
            gender = gender_param,
            phone = phone_param,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = user_id_param;
        
	-- delete user
    ELSEIF action = 7 THEN
        UPDATE users SET is_deleted = 1 WHERE user_id = user_id_param;
	
    -- restore user
    ELSEIF action = 8 THEN
		UPDATE users SET is_deleted = 0 WHERE user_id = user_id_param;
        
    ELSE
        SELECT 'Invalid action';
    END IF;
END //

DELIMITER ;

-- create stored procedure for manage addresses
DROP PROCEDURE manage_addresses;
DELIMITER //

CREATE PROCEDURE manage_addresses(
    IN action INT, 
    IN address_id_param INT,
    IN user_id_param INT,
    IN address_line1_param VARCHAR(100),
    IN address_line2_param VARCHAR(100),
    IN city_param VARCHAR(50),
    IN state_param VARCHAR(50),
    IN country_param VARCHAR(50),
    IN is_primary_param BOOLEAN
)
BEGIN
	-- insert address
    IF action = 1 THEN
        INSERT INTO addresses 
        (user_id, address_line1, address_line2, city, state, country, is_primary)
        VALUES 
        (user_id_param, address_line1_param, address_line2_param, city_param, state_param, country_param, is_primary_param);
        
	-- select address by address_id
    ELSEIF action = 2 THEN
        SELECT * FROM addresses WHERE address_id = address_id_param;
        
	-- select all addresses
    ELSEIF action = 3 THEN
		SELECT * FROM addresses;
	
    -- update address
    ELSEIF action = 4 THEN
        UPDATE addresses
        SET user_id = user_id_param,
            address_line1 = address_line1_param,
            address_line2 = address_line2_param,
            city = city_param,
            state = state_param,
            country = country_param,
            is_primary = is_primary_param
        WHERE address_id = address_id_param;
        
	-- delete address
    ELSEIF action = 5 THEN
        DELETE FROM addresses WHERE address_id = address_id_param;
    ELSE
        SELECT 'Invalid action';
    END IF;
END //

DELIMITER ;


-- actions
-- 1. insert
-- 2. select user by id
-- 3. select active users
-- 4. select inactive users
-- 5. select all users
-- 6. update user by id
-- 7. delete user by id

-- action, user_id, user_role_id, username, email, password, first_name, last_name, date_of_birth, gender, phone

-- insert user
CALL manage_users(1, NULL, 2, 'vrajk', 'vraj@gmail.com', 'vraj123', 'vraj', 'kathiriya', '2000-12-12', 'Male', '9039090490');

-- select user by id
CALL manage_users(2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- select active users
CALL manage_users(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- select inactive users
CALL manage_users(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- select all users
CALL manage_users(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- update user
CALL manage_users(6, 4, 2, 'vrajk', 'vraj@gmail.com', 'vraj123456', 'vraj', 'kathiriya', '2000-11-11', 'Male', '9039090490');

-- delete user
CALL manage_users(7, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- restore user
CALL manage_users(8, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


-- actions for address
-- 1. insert
-- 2. select address by id
-- 3. select all addresses
-- 4. update address
-- 5. delete address

 -- action, address_id, user_id, address_line1, address_line2, city, state, country, is_primary
 -- insert address 
 CALL manage_addresses(1, NULL, 1, '123 Main St', NULL, 'Pune', 'Maharastra', 'India', TRUE);
 
 -- select address by address_id
CALL manage_addresses(2, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- select all addresses
CALL manage_addresses(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- update address
 CALL manage_addresses(4, 4, 2, '123 Main St', NULL, 'Pune', 'Maharastra', 'India', FALSE);
 
 -- delete address
CALL manage_addresses(5, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL);







