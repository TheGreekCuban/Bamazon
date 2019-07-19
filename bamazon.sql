DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR (255) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INT UNSIGNED,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("2019 Macbook Pro", "Electronics", "1400.95", "69"),
        ("Erganomic Logitec Bluetooth Mouse & Keyboard", "Electronics", "49.99", "49"),
        ("Xbox One", "Electronics", "499.75", "20"),
        ("Garden Hose", "Garden/Outdoors", "19.95", "2"),
        ("Roundup Pesticide & Cancer Falicitator", "Garden/Outdoors", "36.99", "4"),
        ("Hoe", "Garden/Outdoors", "15.99", "11"),
        ("Rake", "Garden/Outdoors", "12.99", "32"),
        ("12 Inch Flower Pot", "Garden/Outdoors", "7.99", "44"),
        ("NFL Football", "Sports", "29.99", "22"),
        ("Fishing Rod & Starter Kit", "Sports", "69.99", "3"),
        ("12 Guage Shotgun", "Sports", "499.99", "5");