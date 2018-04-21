drop database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

create table products (
	item_id integer not null auto_increment primary key,
    product_name varcharacter(100) not null,
    department_name varcharacter(50) not null,
    price decimal(5, 2) not null,
    stock_quantity integer not null
);