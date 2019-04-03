// Bamazon customer order portal
// Require npm files mysql and inquire
var mysql = require("mysql");
var inquirer = require("inquirer");

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
// statring progran
function startBam() {
  console.log("loading Items");
  queryAllItems();
}

function queryAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
        for (var i = 0; i < res.length; i++) {
      
      
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
      var item = parseInt(order.ID)
      var qty = parseInt(order.Quantity);
      connection.query(
        "SELECT * FROM products where id=" + item + ";",
        function(err, res) {
          if (err) throw err;

          if (qty > res[0].stock_quantity) {
            console.log("Sorry we do not have that many...There are times it pays to have Amazon Prime");
            console.log("Try a smaller quanity")
            startBam();
          } else {
            total = res[0].price * qty;
            console.log("Thanks for putting the Bam! in Bamazn");
            console.log("you are the best Bam! part about us");
            console.log("You owe $" + total);
            console.log("");

         //inventory update
        connection.query('UPDATE products SET ? Where ?', [{
          stock_quantity: res[0].stock_quantity - order.Quantity
        },{
          id: item
        }], function(err, res){});
        startBam()
     
          }
        }
      );
    });
}
