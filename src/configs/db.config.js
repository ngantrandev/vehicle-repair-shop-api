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
    const pool = createPool({
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        connectionLimit: 10,
        connectTimeout: 10000,
    });

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Lỗi kết nối tới db:', err.message);
            console.log('Thử kết nối lại sau 2 giây...');
            setTimeout(createDatabaseConnection, 2000);
        } else {
            console.log('Kết nối thành công với cơ sở dữ liệu!');
            connection.release(); // Trả lại kết nối về pool sau khi kiểm tra
        }
    });

    // Xử lý sự kiện lỗi cho kết nối sau này
    pool.on('error', (err) => {
        console.error('Mất kết nối đến cơ sở dữ liệu:', err.message);
        if (
            err.code === 'PROTOCOL_CONNECTION_LOST' ||
            err.code === 'ECONNRESET'
        ) {
            console.log('Đang thử kết nối lại sau 2 giây...');
            setTimeout(createDatabaseConnection, 2000);
        }
    });

    return pool;
}
const pool = createDatabaseConnection();

module.exports = pool;
