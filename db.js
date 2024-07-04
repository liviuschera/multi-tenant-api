const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "multi-tenant-db",
    password: "a",
    port: 5432,
});

module.exports = pool;
