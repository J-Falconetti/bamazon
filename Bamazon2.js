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
                        console.log("Sorry we do not have enough to fill your order.  Try again ");
                        startBam()

                            .then(function (order) {
                                var item = order.ID
                                var qty = order.Quantity
                                connection.query('SELECT * FROM products where item_id=' + item + ";", function (err, res) {
                                    if (err) throw err;
                                    // console.log(res)

                                    if (qty > res[0].stock_quantity) {
                                        console.log("Sorry we do not have enough to fill your order.  Try a smaller quanity");
                                        startBam()
                                    }
                                    total = res[0].price * qty;
                                    currentDepartment = res[0].DepartmentName;
                                    console.log('Thanks for using BAM!-azon  Your the the best BAM part of Bamazon');
                                    console.log('You owe $' + total);
                                    console.log('');
                                    // update inventory
                                    connection.query('UPDATE products SET ? Where ?', [{
                                                stock_quantity: res[0].stock_quantity - order.Quantity
                                            },
                                            item_id, item



                                        ]

                                        , )
                                    startBam()

                                })
                            })
                    }

                })
            },
        }