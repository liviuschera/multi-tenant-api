const pool = require("./db");

async function reportPage(req, res) {
    const companyId = req.query.company_id;

    try {
        const result = await pool.query(
            `
      SELECT
        customers.name AS customer_name,
        customers.contact AS customer_contact,
        COUNT(cars.id) AS number_of_cars,
        SUM(service_visits.cost) AS total_paid_cost,
        MAX(service_visits.visit_date) AS last_visit_date
      FROM customers
      JOIN cars ON customers.id = cars.customer_id
      JOIN service_visits ON cars.id = service_visits.car_id
      WHERE service_visits.company_id = $1
      GROUP BY customers.id
    `,
            [companyId]
        );

        const csvData = result.rows.map((row) => ({
            Name: row.customer_name,
            Contact: row.customer_contact,
            "Number of Cars": row.number_of_cars,
            "Total Paid Cost": row.total_paid_cost,
            "Last Visit Date": row.last_visit_date,
        }));
        const csvContent = [
            "Name,Contact,Number of Cars,Total Paid Cost,Last Visit Date",
            ...csvData.map((row) => Object.values(row).join()),
        ].join("\n");

        console.log("🚀 ~ csvData ~ csvData:", csvData);
        console.log("🚀 ~ reportPage ~ csvContent:", csvContent);
        const customerData = result.rows.map((row) => ({
            name: row.customer_name,
            contact: row.customer_contact,
            numberOfCars: row.number_of_cars,
            totalPaidCost: row.total_paid_cost,
            lastVisitDate: row.last_visit_date,
        }));

        res.header("Content-Type", "text/csv");
        res.attachment("customer_value_report.csv");
        res.send({
            csvContent,
            customerData,
        });
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).send("Server error");
    }
}

module.exports = reportPage;
