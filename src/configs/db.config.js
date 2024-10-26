const { createPool, createConnection } = require('mysql');

// const pool = createPool({
//     post: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     connectionLimit: 10,
// });

// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Failed to connect to database with:', err.message);
//     } else {
//         console.log('Connected to database successfully!');
//         connection.release();
//     }
// });

function createDatabaseConnection() {
    const pool = createConnection({
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    // Thử kết nối với cơ sở dữ liệu
    pool.connect((err) => {
        if (err) {
            console.error('Không thể kết nối với csdl:', err.message);
            console.log('Trying re connect...');

            setTimeout(createDatabaseConnection, 2000);
        } else {
            console.log('Kết nối thành công với csdl!');
        }
    });

    pool.on('error', (err) => {
        if (err.code == 'ECONNRESET') {
            console.log('Mất kết nối. Đang thử kết nối lại...');
            setTimeout(createDatabaseConnection, 2000);
        }
    });

    return pool;
}

const pool = createDatabaseConnection();

module.exports = pool;
