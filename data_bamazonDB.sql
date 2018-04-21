use bamazonDB;

insert into products (product_name, department_name, price, stock_quantity) 
	values
		("500_GB_Solid-State_Drive", "Computers", 199.99, 15),
        ("Players_Guide_-_Tabletop_RPG", "Games", 39.99, 20),
        ("20-Sided_Dice_-_Pack_of_5", "Games", 4.99, 20),
        ("10-Sided_Dice_-_Pack_of_5", "Games", 2.99, 15),
        ("8-Sided_Dice_-_Pack_of_5", "Games", 1.99, 20),
        ("6-Sided_Dice_-_Pack_of_20", "Games", 1.99, 50),
        ("Graphics_Card", "Computers", 399.99, 5),
        ("Toaster_Oven", "Appliances", 49.99, 10),
        ("Best_of_Science_Fiction_for_2018", "Books", 19.99, 8),
        ("Best_of_Fantasy_for_2018", "Books", 19.99, 16);

select * from products;