INSERT INTO departments (name)
VALUES 
('Marketing'),
('Sales');

INSERT INTO roles (title, salary, department_id )
VALUES 
('Sales Associate', 25000, 2),
('Sales Manager', 50000, 2),
('Marketing Manager', 64000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Sam', 'Jones', 3, 5),
('Diane', 'Green', 2, 5),
('Corey', 'Jackson', 1, 2),
('Susan', 'Coleman', 1, 2),
('Michael', 'Smith', 1, 2);