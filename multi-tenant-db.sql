CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_global BOOLEAN DEFAULT FALSE);

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE user_companies (
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    PRIMARY KEY (user_id, company_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100) NOT NULL
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    license_plate VARCHAR(20) NOT NULL UNIQUE,
    model VARCHAR(100) NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE service_visits (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    car_id INT NOT NULL,
    visit_date DATE NOT NULL,
    cost NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

INSERT INTO users (username, password, email, is_global) VALUES
('admin1', 'adminpassword1', 'admin1@example.com', TRUE),
('admin2', 'adminpassword2', 'admin2@example.com', TRUE),
('user1', 'userpassword1', 'user1@example.com', FALSE),
('user2', 'userpassword2', 'user2@example.com', FALSE),
('user3', 'userpassword3', 'user3@example.com', FALSE),
('user4', 'userpassword4', 'user4@example.com', FALSE),
('user5', 'userpassword5', 'user5@example.com', FALSE),
('user6', 'userpassword6', 'user6@example.com', FALSE),
('user7', 'userpassword7', 'user7@example.com', FALSE),
('user8', 'userpassword8', 'user8@example.com', FALSE),
('user9', 'userpassword9', 'user9@example.com', FALSE);

INSERT INTO companies (name, address) VALUES
('Company A', '123 Main St'),
('Company B', '456 Oak St'),
('Company C', '789 Pine St'),
('Company D', '101 Maple St'),
('Company E', '202 Birch St'),
('Company F', '303 Cedar St'),
('Company G', '404 Walnut St'),
('Company H', '505 Elm St'),
('Company I', '606 Ash St'),
('Company J', '707 Cherry St'),
('Company K', '808 Beech St');

INSERT INTO user_companies (user_id, company_id) VALUES
(16, 1), (16, 4),
(18, 2), (18, 5),
(19, 3), (19, 6),
(20, 7), (20, 8),
(7, 9), (7, 10),
(8, 10), (8, 11),
(9, 11), (9, 1),
(10, 2), (10, 3),
(11, 4), (11, 5);

INSERT INTO customers (name, contact) VALUES
('Customer A', 'customerA@example.com'),
('Customer B', 'customerB@example.com'),
('Customer C', 'customerC@example.com'),
('Customer D', 'customerD@example.com'),
('Customer E', 'customerE@example.com'),
('Customer F', 'customerF@example.com'),
('Customer G', 'customerG@example.com'),
('Customer H', 'customerH@example.com'),
('Customer I', 'customerI@example.com'),
('Customer J', 'customerJ@example.com'),
('Customer K', 'customerK@example.com');


INSERT INTO cars (license_plate, model, customer_id) VALUES
('ABC123', 'Toyota Camry', 1),
('DEF456', 'Honda Accord', 2),
('GHI789', 'Ford Focus', 3),
('JKL012', 'Chevy Malibu', 4),
('MNO345', 'Nissan Altima', 5),
('PQR678', 'BMW 3 Series', 6),
('STU901', 'Audi A4', 7),
('VWX234', 'Mercedes C-Class', 8),
('YZA567', 'Tesla Model 3', 9),
('BCD890', 'Lexus IS', 10),
('EFG123', 'Mazda 6', 11);


INSERT INTO service_visits (company_id, car_id, visit_date, cost) VALUES
(1, 1, '2024-01-01', 100.00),
(1, 2, '2024-01-15', 120.00),
(1, 3, '2024-02-01', 110.00),
(1, 1, '2024-02-10', 105.00),
(1, 3, '2024-03-01', 115.00),
(2, 4, '2024-02-10', 130.00),
(2, 5, '2024-02-20', 140.00),
(2, 2, '2024-03-01', 135.00),
(2, 6, '2024-03-10', 125.00),
(2, 4, '2024-03-20', 145.00),
(3, 7, '2024-03-01', 150.00),
(3, 8, '2024-03-10', 160.00),
(3, 3, '2024-03-20', 155.00),
(3, 9, '2024-03-25', 165.00),
(3, 7, '2024-04-01', 170.00),
(4, 10, '2024-04-01', 180.00),
(4, 11, '2024-04-10', 190.00),
(4, 1, '2024-04-15', 175.00),
(4, 4, '2024-04-20', 185.00),
(4, 10, '2024-05-01', 195.00),
(5, 5, '2024-05-01', 200.00),
(5, 6, '2024-05-10', 210.00),
(5, 7, '2024-05-15', 205.00),
(5, 2, '2024-05-20', 215.00),
(5, 5, '2024-05-25', 220.00),
(6, 8, '2024-06-01', 220.00),
(6, 9, '2024-06-10', 230.00),
(6, 10, '2024-06-15', 225.00),
(6, 3, '2024-06-20', 235.00),
(6, 8, '2024-07-01', 240.00),
(7, 11, '2024-07-01', 240.00),
(7, 1, '2024-07-10', 250.00),
(7, 4, '2024-07-15', 245.00),
(7, 5, '2024-07-20', 255.00),
(7, 11, '2024-07-25', 260.00),
(8, 6, '2024-08-01', 260.00),
(8, 7, '2024-08-10', 270.00),
(8, 8, '2024-08-15', 265.00),
(8, 9, '2024-08-20', 275.00),
(8, 6, '2024-08-25', 280.00),
(9, 10, '2024-09-01', 280.00),
(9, 11, '2024-09-10', 290.00),
(9, 2, '2024-09-15', 285.00),
(9, 3, '2024-09-20', 295.00),
(9, 10, '2024-09-25', 300.00),
(10, 1, '2024-10-01', 300.00),
(10, 4, '2024-10-10', 310.00),
(10, 5, '2024-10-15', 305.00),
(10, 6, '2024-10-20', 315.00),
(10, 1, '2024-10-25', 320.00),
(11, 7, '2024-11-01', 320.00),
(11, 8, '2024-11-10', 330.00),
(11, 9, '2024-11-15', 325.00),
(11, 10, '2024-11-20', 335.00),
(11, 7, '2024-11-25', 340.00);
