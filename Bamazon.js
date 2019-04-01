// Bamazon customer order portal
// Require npm files mysql and inquire
var mysql = require("mysql");
var inquirer = require("inquirer");
//  var Table = require("cli-table");

// Setting connection to SQL db
var connection = mysql.createConnection({
    host: "localhost",
    // setting port/user/password for sql
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startBam()
});

function startBam() {
    console.log("loading Items")
    queryAllItems()
}

function queryAllItems() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // var displayTable = new Table ({
        // 	head: ["Item ID", "Product Name", "Price"],
        //     colWidths: [10,25,14]

        // });        
        for (var i = 0; i < res.length; i++) {
            // displayTable.push([
            //     res[i].item_id,
            //     res[i].product_name,
            //     res[i].price
            // ]);
            // console.log(Table.toString());
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | ");




            //   console.log("-----------------------------------");

        }
        purchasePrompt();
    })

}

function purchasePrompt() {
    inquirer.prompt([{
                name: "ID",
                type: "input",
                message: "Please enter Item ID you like to purhcase.",
                filter: Number
            },
            {
                name: "Quantity",
                type: "input",
                message: "How many items do you wish to purchase?",
                filter: Number

            }
        ])
        .then(function (order) {
            var item = order.ID
            var qty = order.Quantity
            connection.query('SELECT * FROM products where item_id=' + item + ";", function (err, res) {
                if (err) throw err;
                console.log(res)

                if (qty > res[0].stock_quantity) {
                    console.log("go to Amazon");
                    startBam()
                }
            })
        })
}




// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase