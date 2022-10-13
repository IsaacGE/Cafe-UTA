DROP DATABASE if EXISTS webstore;
CREATE DATABASE webstore;
USE webstore;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    completeName VARCHAR(50) NOT NULL,
    email VARCHAR(60) UNIQUE,
    imageUrl VARCHAR(250),
    pass VARCHAR(200) NOT NULL,
    registDate DATETIME,
    status BOOLEAN,
    role enum("admin", "client")
);


CREATE TABLE category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    stock FLOAT NOT NULL,
    idCategory int not NULL, 
    FOREIGN KEY(idCategory) REFERENCES category(id)
);
