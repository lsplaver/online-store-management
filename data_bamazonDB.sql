use bamazonDB;

insert into products (product_name, department_name, price, stock_quantity) 
	values
		("500 GB Solid-State Drive", "Computers", 199.99, 15),
        ("Player's Guide - Tabletop RPG", "Games", 39.99, 20),
        ("20-Sided Dice - Pack of 5", "Games", 4.99, 20),
        ("10-Sided Dice - Pack of 5", "Games", 2.99, 15),
        ("8-Sided Dice - Pack of 5", "Games", 1.99, 20),
        ("6-Sided Dice - Pack of 20", "Games", 1.99, 50),
        ("Graphics Card", "Computers", 399.99, 5),
        ("Toaster Oven", "Appliances", 49.99, 10),
        ("Best of Science Fiction for 2018", "Books", 19.99, 8),
        ("Best of Fantasy for 2018", "Books", 19.99, 16);

select * from products;