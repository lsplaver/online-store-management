var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazonDB"
});

function newConnection() {
    connection.connect(function (err) {
        if (err) {
            throw err;
        }

        console.log("Connected as id: " + connection.threadId);
    });
}

newConnection();

start();

var productArray = [];
var productObj = {
    itemID: 0,
    itemName: "",
    itemPrice: 0
};
function start() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }

        else {
            productArray.slice(0, productArray.length);
            for (var x = 0; x < res.length; x++) {
                console.log("Item ID: " + res[x].item_id + " || Product Name: " + res[x].product_name + " || Price: $" + res[x].price);
                productArray.push({
                    itemID: res[x].item_id,
                    itemName: res[x].product_name,
                    itemPrice: res[x].price
                });
            };
            chooseItemToBuy();
        }
    });
};

function exitBamazon() {
    connection.end();
    return console.log("Now leaving bamazon. Good-bye!");
};

function chooseItemToBuy() {
    var choices = Array.apply(0, new Array(productArray.length)).map((x, y) => productArray[y].itemName.toString());
    var tempStock = -9999, tempName = "", tempID = -999, tempDepartment = "", tempPrice = -999;
    inquirer.prompt([
        {
            type: "list",
            name: "product_name",
            message: "Please select the item you wish to purchase.",
            choices: choices
        },
        {
            type: "input",
            name: "amountToBuy",
            message: "Please enter how many of the item you wish to purchase",
            validate: function (value) {
                if ((isNaN(value) === false) && (parseInt(value) > 0)) {
                    return true;
                }

                return false;
            }
        }
    ]).then(function (answer) {
        var tempProductName = "";
        tempProductName = answer.product_name;
        var query2 = connection.query(
            "SELECT * FROM products WHERE ?",
            {
                product_name: tempProductName
            },
            function (err, results) {
                if (err) {
                    console.log("there is an error");
                    console.log(err);
                    throw err;
                }

                if (answer.amountToBuy > results[0].stock_quantity) {
                    inquirer.prompt({
                        type: "list",
                        name: "menu",
                        message: "There is insufficient quantity of " + results[0].product_name + "remaining to fufill the order. \nPlease select again or exit.",
                        choices: ["Go Back", "Exit"]
                    }).then(function (incorrectMenuResponse) {
                        if (incorrectMenuResponse.menu === "Go Back") {
                            return chooseItemToBuy();
                        }

                        else {
                            return exitBamazon();
                        }
                    });
                }

                else {
                    var newQuantity = results[0].stock_quantity - answer.amountToBuy;
                    var query3 = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                product_name: answer.product_name
                            }
                        ],
                        function (err, results2) {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        });
                    var newQuery = "SELECT price, stock_quantity FROM products WHERE product_name = '";
                    newQuery += answer.product_name + "'";
                    connection.query(newQuery, function (err, results4) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        var totalPurchasePrice = answer.amountToBuy * results4[0].price;
                        console.log("Purchase complete, cart now empty. \nThe total purchase price for " + answer.amountToBuy + " of " + answer.product_name + " comes to $ " + totalPurchasePrice);

                        inquirer.prompt({
                            type: "list",
                            name: "menu",
                            message: "Thank You for your purchase. \nPlease select again or exit.",
                            choices: ["Go Back", "Exit"]
                        }).then(function (incorrectMenuResponse) {
                            if (incorrectMenuResponse.menu === "Go Back") {
                                return chooseItemToBuy();
                            }

                            else {
                                return exitBamazon();
                            }
                        });
                    });
                }
            });
    });
};
