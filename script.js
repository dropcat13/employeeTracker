const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "10987Nosred!",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
//   call a funtion in here (); 
});


// Example function:
// function readColleges() {
//   connection.query("SELECT name FROM colleges", function(err, res) {
//     if (err) throw err;

//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }
