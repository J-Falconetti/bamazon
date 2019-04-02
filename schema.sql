--RERUN ALL THIS PRICE WAS INSERTED WONG 3/27 GIT PULLS
-- SQL files
-- Bamazon
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;
--  creating table for itmes in stock

CREATE TABLE products (
id INT(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255),
department_name VARCHAR(255),
price DECIMAL(10,2) NULL,
stock_quantity INT(15),
PRIMARY KEY (id)
);