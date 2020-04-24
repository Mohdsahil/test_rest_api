const { createPool } = require('mysql');

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTIONIMIT
});

module.exports = pool;