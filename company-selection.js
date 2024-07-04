const pool = require("./db");

async function companySelection(req, res) {
    const userId = req.user.userId;
    console.log("🚀 ~ userId:", userId);
    console.log("🚀 ~ req.user.is_global:", req.user.is_global);

    let query = "SELECT * FROM companies";

    if (!req.user.is_global) {
        query += ` INNER JOIN user_companies ON companies.id = user_companies.company_id WHERE user_companies.user_id = ${userId}`;
    }

    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).send("Server error");
    }
}

module.exports = companySelection;
