// import { exists } from "fs";

var mysql = require("mysql");
var inquirer = require("inquirer");

var userID = ""; //answer.userID;
debugger;
var password = ""; //answer.userPassword;
debugger;

// // function newConnection() {
// //     debugger;
//     // inspect.debugger();
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "userID",
//             message: "Please enter your MySQL user id"
//         // },
//         // // console.log("First answered"),
//         // {
//         //     type: "password",
//         //     name: "userPassword",
//         //     message: "Please enter your password"
//         }
//     ]).then(function(answer) {//;///*console.log("\ntest"),*/ function (answer) {
//         debugger;
//         console.log("Both answered");
//         userID = answer.userID;
//         password = answer.password;
//         console.log(answer.userID);
//         consoole.log(answer.userPassword);
//         debugger;
//         var connection = mysql.createConnection({
//             host: "localhost",
//             port: 3306,

//             user: userID,

//             password: password,
//             database: "bamazonDB"
//         });
//         debugger;
//         userID = "";
//         password = "";
//     });
// };
// };
// function newConnection() {
console.log("Before creating connection");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazonDB"
});
console.log("After creating connection");

function newConnection() {
    connection.connect(function (err) {
        if (err) {
            throw err;
        }

        console.log("Connected as id: " + connection.threadId);
        // start();
    });
}

newConnection();

start();

var productArray = [];// [productObj];
var productObj = {
    itemID: 0,
    itemName: "",
    itemPrice: 0
};
function start() {
    console.log("Beginning of start()");
    var query = "SELECT item_id, product_name, price FROM products";
    console.log("query = " + query);
    // console.log("productArray before connection.query" + productArray.values.toString());
    connection.query(query, function (err, res) {
        // console.log("productArray before connection.query" + productArray.values.toString());
        if (err) {
            console.log("productArray before connection.query" + productArray.values.toString());
            console.log("About to throw error with select statement: \n ");
            throw err;
        }

        else {
            // console.log("productArray before connection.query" + productArray.values.toString());
            console.log("productArray is before slicing: " + productArray);
            productArray.slice(0, productArray.length);
            for (var x = 0; x < res.length; x++) {
                console.log("res Item ID: " + res[x].item_id + " || res Product Name: " + res[x].product_name + " || res Price: $" + res[x].price);
                productObj.itemID = res[x].item_id;
                console.log("productObj.itemID at x = " + x + " is: " + productObj.itemID);
                productObj.itemName = res[x].product_name;
                console.log("productObj.itemName at x = " + x + " is: " + productObj.itemName);
                productObj.itemPrice = res[x].price;
                console.log("productObj.itemPrice at x = " + x + " is: " + productObj.itemPrice);
                // productArray.push(productObj);
                productArray.push({
                    itemID: res[x].item_id, //productObj.itemID,
                    itemName: res[x].product_name, //productObj.itemName,
                    itemPrice: res[x].price //productObj.itemPrice
                });
                console.log("productArray is: " + productArray[x].itemID.toString() + " || " + productArray[x].itemName.toString() + " || " + productArray[x].itemPrice.toString());
            };

            // connection.end();

            chooseItemToBuy();
        }
        // console.log(res);
        // connection.end();
    });

    // chooseItemToBuy();
};

function exitBamazon() {
    connection.end();
    return console.log("Now leaving bamazon. Good-bye!");
};

function chooseItemToBuy() {
    // connection.connect(function (err) {
    //     if (err) {
    //         throw err;
    //     }

    //     console.log("Connected as id: " + connection.threadId);
    //     // start();
    // });
    console.log("----------------------------------------");
    for (var x = 0; x < productArray.length; x++) {
        console.log("The item in productArray[" + x + "] is:");
        console.log("Item ID: " + productArray[x].itemID.toString() + " || Product Name: " + productArray[x].itemName.toString() /*res[x].product_name*/ + " || Price: $" + productArray[x].itemPrice.toString() /*res[x].price*/);

    }
    var choicesList = function () {
        for (var x = 0; x < productArray.length; x++) {
            productArray[x].itemName.toString();
        };
    };
    var tempStock = -9999, tempName = "", tempID = -999, tempDepartment = "", tempPrice = -999;
    inquirer.prompt([
        {
            type: "list",
            name: "product_name",
            message: "Please select the item you wish to purchase.",
            // choices: [choicesList()]
            choices: [productArray[0].itemName.toString(), productArray[1].itemName.toString(), productArray[2].itemName.toString(), productArray[3].itemName.toString(), productArray[4].itemName.toString(), productArray[5].itemName.toString(), productArray[6].itemName.toString(), productArray[7].itemName.toString(), productArray[8].itemName.toString(), productArray[9].itemName.toString()]
        },
        {
            type: "input",
            name: "amountToBuy",
            message: "Please enter how many of the item you wish to purchase",
            // validate: 
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
        console.log("chosen product name is: " + answer.product_name);
        console.log("tempProductName: " + tempProductName);
        console.log("chosen amount is: " + answer.amountToBuy);
        // var query2 = "SELECT * FROM products WHERE ?"; //product_name = '";
        // query += answer.product_name + "'";
        // query += tempProductName + "'";
        // console.log("query is: " + query2);
        console.log("connection id before query: " + connection.threadId);
        // connection.query(query, { product_name: tempProductName /*answer.product_name*/ }, function (err, res) {
        var query2 = connection.query(
            // "SELECT item_id, product_name, department_name, price, stock_quantity FROM products", // WHERE ?",
            // {
            //     product_name: tempProductName
            // },
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

                // console.log(query2.sql);
                console.log("connection id after query: " + connection.threadId);
                // console.log("res is equal to: " + res2.values.toString());
                console.log("the length of results: " + results.length);
                console.log("res: \n" + results[0].product_name); //.toString());
                console.log("err: \n " + err);
                console.log("res.item_id: " + results[0].item_id);
                console.log("query: " + query2); //.sql);
                tempDepartment = results[0].department_name;
                tempID = results[0].item_id;
                tempName = results[0].product_name;
                tempPrice = results[0].price;
                tempStock = results[0].stock_quantity;
                // }
                // );
                // console.log("connection id after query: " + connection.threadId);
                // console.log("res: \n" + res.product_name);
                // console.log("err: \n " + err);
                // console.log("res.item_id: " + res.item_id);
                // console.log("query: " + query);
                console.log("res.stock_quantity before if statement is: " + tempStock); // results.stock_quantity);
                if (answer.amountToBuy > tempStock) { // results.stock_quantity) {
                    console.log("res.stock_quantity is: " + tempStock); // results.stock_quantity);
                    // console.log("There is insufficient quantity of " + res.product_name + "remaining to fufill the order. \nPlease select again or exit.");

                    inquirer.prompt({
                        type: "list",
                        name: "menu",
                        message: "There is insufficient quantity of " + tempProductName /*res.product_name*/ + "remaining to fufill the order. \nPlease select again or exit.",
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
                    console.log("res.stock_quantity before update is: " + tempStock); // res.stock_quantity);
                    console.log("chosenItemResponse.amountToBuy before update is: " + answer.amountToBuy);
                    var newQuantity = tempStock /*res.stock_quantity*/ - answer.amountToBuy;
                    console.log("product_name: chosenItemResponse.product_name is: " + answer.product_name);
                    console.log("newQuantity is: " + newQuantity);
                    var query3 = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        // "UPDATE products SET stock_quantity = " + newQuantity + " WHERE product_name = " + tempProductName,
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                product_name: answer.product_name
                            }
                        ],
                        function (err, results2) {
                            // console.log(results2.affectedRows + " products updated!\n");
                            console.log("Products updated");
                            // console.log(results2.affectedRows.length);
                        });
                    var newQuery = "SELECT price, stock_quantity FROM products WHERE product_name = '";
                    newQuery += answer.product_name + "'";
                    console.log("newQuery is: " + newQuery);
                    connection.query(newQuery, function (err, results4) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        // })
                        console.log("res: " + results4);
                        console.log("results4.length: " + results4.length);
                        console.log("results4[0].toString(): " + results4[0].stock_quantity.toString());
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
                    // });
                }
            });
    });
};

    // newConnection();

    // connection.connect(function (err) {
    //     if (err) {
    //         throw err;
    //     }

    //     console.log("Connected as id: " + connection.threadId);
    //     start();
    // });
// };

// newConnection();
