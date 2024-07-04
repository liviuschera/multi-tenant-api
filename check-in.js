const pool = require("./db");

async function checkIn(req, res) {
    const {
        companyId: company_id,
        customerName: customer_name,
        customerContact: customer_contact,
        carLicensePlate: car_license_plate,
        carModel: car_model,
        cost,
    } = req.body;

    try {
        let customerResult = await pool.query(
            "SELECT id FROM customers WHERE contact = $1",
            [customer_contact]
        );
        let customerId;

        if (customerResult.rows.length === 0) {
            customerResult = await pool.query(
                "INSERT INTO customers (name, contact) VALUES ($1, $2) RETURNING id",
                [customer_name, customer_contact]
            );
            customerId = customerResult.rows[0].id;
        } else {
            customerId = customerResult.rows[0].id;
        }

        let carResult = await pool.query(
            "SELECT id FROM cars WHERE license_plate = $1",
            [car_license_plate]
        );
        let carId;

        if (carResult.rows.length === 0) {
            carResult = await pool.query(
                "INSERT INTO cars (license_plate, model, customer_id) VALUES ($1, $2, $3) RETURNING id",
                [car_license_plate, car_model, customerId]
            );
            carId = carResult.rows[0].id;
        } else {
            carId = carResult.rows[0].id;
        }

        await pool.query(
            "INSERT INTO service_visits (company_id, car_id, visit_date, cost) VALUES ($1, $2, NOW(), $3)",
            [company_id, carId, cost]
        );

        res.status(201).send("Car checked in successfully");
    } catch (error) {
        console.error("Error checking in car:", error);
        res.status(500).send("Server error");
    }
}

module.exports = checkIn;
