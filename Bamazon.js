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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  startBam();
});

function startBam() {
  console.log("loading Items");
  queryAllItems();
}

function queryAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
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
      console.log(
        res[i].id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].price +
          " | "
      );

      //   console.log("-----------------------------------");
    }
    purchasePrompt();
  });
}

function purchasePrompt() {
  inquirer
    .prompt([
      {
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
    .then(function(order) {
      console.log(order);
      var item = parseInt(order.ID)
      // var item = order.ID;
      console.log("this is the item", item)
      var qty = order.Quantity;
      console.log(qty)
      connection.query(
        "SELECT * FROM products where id=" + item + ";",
        function(err, res) {
          if (err) throw err;
          console.log(res);

          if (qty > res[0].stock_quantity) {
            console.log("go to Amazon");
            startBam();
          } else {
            total = res[0].price * qty;
            console.log("Thanks for putting the Bam! in Bamazn");
            console.log("You owe $" + total);
            console.log("");
        //     //inventory update
        // connection.query('UPDATE products SET ? Where ?', [{
        //   stock_quantity: res[0].stock_quantity - order.Quantity
        // },{
          
        // }], function(err, res){});
        // startBam()
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? Where id = ?", [
              [qty, item], function(err,res){
			  if (err) throw err;
			  console.log(res)
              }]);
          }
        }
      );
    });
}
