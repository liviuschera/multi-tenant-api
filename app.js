const express = require("express");
const cors = require("cors");
const { authenticateToken, signup, login, authenticate } = require("./auth");
const pool = require("./db");
const app = express();
const reportPage = require("./reportPage");
const checkIn = require("./check-in");
const companySelection = require("./company-selection");

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

// Signup route
app.post("/signup", signup);

// Login route
app.post("/login", login);

// Logout route (for client-side handling, we just need to discard the token)
app.post("/logout", (req, res) => {
    res.json({ message: "Logged out" });
});

app.post("/check-in", authenticate, checkIn);

app.get("/report/customers", authenticate, reportPage);

app.get("/companies", authenticate, companySelection);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
