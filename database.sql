
-- Create the food_store database if it doesn't exist
CREATE DATABASE IF NOT EXISTS food_store;

-- Use the food_store database
USE food_store;

-- Create the customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(15),
    price DECIMAL(10, 2) NOT NULL,
  UNIQUE (email)
) ENGINE=INNODB;

-- Create the order table
CREATE TABLE IF NOT EXISTS oder (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT(10) NOT NULL,
    customert_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    orderd_item VARCHAR(255) NOT NULL,
    order_qty INT(10) NOT NULL,
    order_price DECIMAL(10, 2) NOT NULL,
FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE ON   UPDATE NO ACTION 
)ENGINE=INNODB;

-- Create the menu table
CREATE TABLE IF NOT EXISTS menu (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_name VARCHAR(100) NOT NULL

) ENGINE=INNODB;

-- Create the menu_options table
CREATE TABLE IF NOT EXISTS menu (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(100) NOT NULL,
     menu_id INT(10) NOT NULL,
     FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE ON   UPDATE NO ACTION 
) ENGINE=INNODB;
