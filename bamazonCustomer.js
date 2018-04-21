var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazonDB"
});

function start() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) {
            throw err;
        }

        for (var x = 0; x < res.length; x++) {
            console.log("Item ID: " + res[x].item_id + " || Product Name: " + res[x].product_name + " || Price: $" + res[x].price);
        };
        // console.log(res);
        connection.end();
    });
};

connection.connect(function(err) {
    if (err) {
        throw err;
    }

    console.log("Connected as id: " + connection.threadId);
    start();
});