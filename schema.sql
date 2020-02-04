DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) 
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
