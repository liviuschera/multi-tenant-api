const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const JWT_SECRET = process.env.JWT_SECRET;

async function signup(req, res) {
    const { username, password, email, is_global } = req.body;

    // const user = users.find((user) => user.username === username);
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    if (user.rows.length > 0)
        return res.status(400).send("Username already taken!");

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = { username, password: hashedPassword, email, is_global };

    try {
        const result = await pool.query(
            "INSERT INTO users (username, password, email, is_global) VALUES ($1, $2, $3, $4) RETURNING *",
            [
                newUser.username,
                newUser.password,
                newUser.email,
                newUser.is_global,
            ]
        );
        newUser.id = result.rows[0].id;
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error while creating user!");
    }

    res.json({ message: "User created!" });
}

async function login(req, res) {
    const { username, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);

    if (user.rows.length < 1) return res.status(400).send("User not found");

    const isPasswordValid = bcrypt.compareSync(password, user.rows[0].password);
    if (!isPasswordValid) return res.status(400).send("Invalid password");

    const token = jwt.sign(
        { userId: user.rows[0].id, is_global: user.rows[0].is_global },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.json({
        token,
    });
}

// Middleware for checking token
function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("🚀 ~ authenticate ~ authHeader:", authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log("🚀 ~ authenticate ~ token:", token);

    if (token == null) return res.sendStatus(401).send("Access denied!");

    jwt.verify(token, JWT_SECRET, (err, user) => {
        console.log(err);

        if (err)
            return res.status(403).send("Invalid token!").redirect("/login");
        // if (err) return res.sendStatus(403).redirect("/login");

        req.user = user;

        next();
    });
}

module.exports = { signup, login, authenticate };
