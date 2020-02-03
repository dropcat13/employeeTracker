INSERT INTO departments (id, name)
VALUES 
(1, 'Marketing'),
(2, 'Sales');

INSERT INTO roles (id, title, salary, department_id )
VALUES 
(1, 'Sales Associate', 25000, 2),
(2, 'Sales Manager', 50000, 2),
(3, 'Marketing Manager', 64000, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Sam', 'Jones', 3, 5),
(2, 'Diane', 'Green', 2, 5),
(3, 'Corey', 'Jackson', 1, 2),
(4, 'Susan', 'Coleman', 1, 2),
(5, 'Michael', 'Smith', 1, 2);