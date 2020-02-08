const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require("console.table");
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
  startQuestions();
});

function startQuestions() {
  inquirer
    .prompt({
      type: "list",
      name: "activity",
      message: "Do you want to [ADD], [VIEW] or [UPDATE] records?",
      choices: ["ADD", "VIEW", "UPDATE", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the add, view of update functions
      if (answer.activity === "ADD") {
        addQuestions();
      } else if (answer.activity === "VIEW") {
        viewQuestions();
      } else if (answer.activity === "UPDATE") {
        updateQuestions();
      } else {
        connection.end();
      }
    });
}

function addQuestions() {
  inquirer
    .prompt({
      type: "list",
      name: "addType",
      message: "Do you want to add [DEPARTMENTS], [ROLES] or [EMPLOYEES]?",
      choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the add departments, add roles or add employees functions
      if (answer.addType === "DEPARTMENTS") {
        addDepartments();
      } else if (answer.addType === "ROLES") {
        addRoles();
      } else if (answer.addType === "EMPLOYEES") {
        addEmployees();
      } else {
        connection.end();
      }
    });
}

function viewQuestions() {
  inquirer
    .prompt({
      type: "list",
      name: "viewType",
      message:
        "Do you want to view the records of [DEPARTMENTS], [ROLES] or [EMPLOYEES]?",
      choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES", "EXIT"]
    })
    .then(function(answer) {
        
      // based on their answer, either call the add departments, add roles or add employees functions
      if (answer.viewType === "DEPARTMENTS") {
        viewDepartments();
      } else if (answer.viewType === "ROLES") {
        viewRoles();
      } else if (answer.viewType === "EMPLOYEES") {
        viewEmployees();
      } else {
        connection.end();
      }
    });
}

function updateQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "updateEmployeeAnswer",
        message: "Please enter the ID of the employee you wish to update."
      },
      {
        type: "input",
        name: "updateEmployeeFirstName",
        message: "Please enter the updated first name of the employee."
      },
      {
        type: "input",
        name: "updateEmployeeSecondName",
        message: "Please enter the updated second name of the employee"
      },
      {
        type: "input",
        name: "updateEmployeeManagerID",
        message: "Please enter the ID of the updated employee's manager"
      },
      {
        type: "input",
        name: "updateEmployeeRoleID",
        message: "Please enter the ID of the updated employee's role"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE employees SET ? WHERE ?",
        [
          {
            first_name: answer.updateEmployeeFirstName
          },
          {
            last_name: answer.updateEmployeeSecondName
          },
          {
            role_id: answer.updateEmployeeRoleID
          },
          {
            manager_id: answer.updateEmployeeManagerID
          }
        ],
        function(error) {
          if (error) throw err;
          console.log("Employee updated sucessfully!");
          startQuestions();
        }
      );
    });
}

function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDeptName",
        message: "Please enter the name of the department you wish to add."
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the table with the info
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.addDeptName
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was added successfully!");
          startQuestions();
        }
      );
    });
}

function addRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRoleTitle",
        message: "Please enter the title of the role you wish to add."
      },
      {
        type: "input",
        name: "addRoleSalary",
        message: "Please enter the salary of the role"
      },
      {
        type: "input",
        name: "addRoleDeptID",
        message: "Please enter the ID of the role's department"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the table with the info
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.addRoleTitle,
          salary: answer.addRoleSalary,
          department_id: answer.addRoleDeptID
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was added successfully!");
          startQuestions();
        }
      );
    });
}

function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployeeFirstName",
        message: "Please enter the first name of the employee you wish to add."
      },
      {
        type: "input",
        name: "addEmployeeSecondName",
        message: "Please enter the second name of the employee"
      },
      {
        type: "input",
        name: "addEmployeeManagerID",
        message: "Please enter the ID of the new employee's manager"
      },
      {
        type: "input",
        name: "addEmployeeRoleID",
        message: "Please enter the ID of the new employee's role"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the table with the info
      connection.query(
        "INSERT INTO departments SET ?",
        {
          first_name: answer.addEmployeeFirstName,
          last_name: answer.addEmployeeSecondName,
          role_id: answer.addEmployeeRoleID,
          manager_id: answer.addEmployeeManagerID
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was added successfully!");
          startQuestions();
        }
      );
    });
}

function viewDepartments() {
  inquirer
    .prompt({
      type: "input",
      name: "deptNameAnswer",
      message: "Please enter the name of the department you wish to view."
    })
    .then(function(answer) {
      connection.query(
        "SELECT * FROM departments WHERE ?",
        { name: answer.deptNameAnswer },
        function(err, res) {
          if (err) throw err;

          // Log all results of the SELECT statement
          console.table(res);
          startQuestions();
        }
      )}
    );
}

function viewRoles() {
  inquirer
    .prompt({
      type: "input",
      name: "roleTitleAnswer",
      message: "Please enter the title of the role you wish to view."
    })
    .then(function(answer) {
      connection.query(
        "SELECT * FROM roles WHERE ?",
        {title: answer.roleTitleAnswer},
        function(err, res) {
          if (err) throw err;

          // Log all results of the SELECT statement
          console.table(res);
          startQuestions();
        }
      )}
    );
}

function viewEmployees() {
  inquirer
    .prompt({
      type: "input",
      name: "employeeIDAnswer",
      message: "Please enter the id of the employee you wish to view."
    })
    .then(function(answer) {
      connection.query(
        ("SELECT * FROM employees WHERE ?",
        { id: answer.employeeIDAnswer },
        function(err, res) {
          if (err) throw err;

          // Log all results of the SELECT statement
          console.table(res);
          startQuestions();
        })
      )}
    );
}
