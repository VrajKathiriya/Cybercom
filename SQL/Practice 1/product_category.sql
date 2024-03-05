-- create database
CREATE DATABASE cybercom;

-- use database
USE cybercom;

-- create table categories
CREATE TABLE categories(
category_id INT PRIMARY KEY,
category_name VARCHAR(50)
);

-- create table products
CREATE TABLE products(
product_id INT PRIMARY KEY,
product_name VARCHAR(50)
);

-- create table product_category
CREATE TABLE product_category(
product_id INT,
category_id INT,
PRIMARY KEY (product_id,category_id),
FOREIGN KEY (product_id) REFERENCES products(product_id),
FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- insert values into products table
INSERT INTO products
(product_id,product_name)
VALUES
(101,'chair'),
(102,'apple'),
(103,'mango'),
(104,'table'),
(105,'potato'),
(106,'pizza'),
(107,'mobile'),
(108,'laptop'),
(109,'box'),
(110, 'tomato');

-- select all entries from products table
SELECT * FROM products;

-- insert values into categories table
INSERT INTO categories
(category_id, category_name)
VALUES
(1,'furniture'),
(2,'fruites'),
(3,'fast-food'),
(4,'electronics'),
(5,'vegitables'),
(6,'eatable'),
(7,'not-eatable');

DROP TABLE products;

-- select values from categories table
SELECT * FROM categories;

-- insert values in product_category 
-- which allows that one product can be in more than one categories
-- and one categories can have more than one product
INSERT INTO product_category
(product_id,category_id)
VALUES
(101,1),
(101,6),
(102,2),
(102,7),
(103,2),
(103,7),
(104,1),
(104,6),
(105,5),
(105,6),
(106,3),
(106,6),
(107,4),
(107,7),
(108,4),
(108,7),
(109,1),
(109,7),
(110,5),
(110,6);

SELECT category_id,COUNT(product_id) FROM product_category GROUP BY category_id;




