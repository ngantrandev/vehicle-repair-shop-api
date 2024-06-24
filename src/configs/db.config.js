const { createPool } = require('mysql');

const pool = createPool({
    post: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Failed to connect to database with:', err.message);
    } else {
        console.log('Connected to database successfully!');
        connection.release();
    }
});

module.exports = pool;
