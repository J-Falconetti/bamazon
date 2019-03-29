--RERUN ALL THIS PRICE WAS INSERTED WONG 3/27 GIT PULLS
-- SQL files
-- Bamazon
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon
--  creating table for itmes in stock

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255),
department_name VARCHAR(255),
price DECIMAL(10,2) NULL,
stock_quantity INTEGER(15),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light Saber", "Toys", 99.99, 25)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("X-wing", "Toys", 49.99, 45)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tie-Fighter", "Toys", 69.99, 74)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Computers", 29.99, 87)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mouse", "Computers", 19.99, 125)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monitor", "Computers", 199.99, 32)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Head Set", "Phones", 49.99, 129)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Droid by R2 Phone", "Phones", 999.99, 29)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("U-phone", "Phones", 1449.99, 19)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("65 inch UHD", "TV", 649.99, 18)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("55 inch HD", "TV", 349.99, 129)

