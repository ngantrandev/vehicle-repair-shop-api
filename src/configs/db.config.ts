const { createPool } = require('mysql');

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
// set time if connection lost
const timeToReconnect = 5;

if (
    !process.env.DB_PORT ||
    !process.env.DB_HOST ||
    !process.env.DB_USER ||
    !process.env.DB_NAME
) {
    // throw new Error(
    //     "Missing database configuration. Please check your '.env' file."
    // );
    console.error(
        'Missing database configuration. Please check your ".env" file.'
    );
}

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

    pool.getConnection((err: NodeJS.ErrnoException, connection: any) => {
        if (err) {
            console.error('Lỗi kết nối tới db:', err.message);
            console.log(`Thử kết nối lại sau ${timeToReconnect} giây...`);
            setTimeout(createDatabaseConnection, timeToReconnect * 1000);
        } else {
            console.log('Kết nối thành công với cơ sở dữ liệu!');
            connection.release(); // Trả lại kết nối về pool sau khi kiểm tra
        }
    });

    // Xử lý sự kiện lỗi cho kết nối sau này
    pool.on('error', (err: NodeJS.ErrnoException) => {
        console.error('Mất kết nối đến cơ sở dữ liệu:', err.message);
        if (
            err.code === 'PROTOCOL_CONNECTION_LOST' ||
            err.code === 'ECONNRESET'
        ) {
            console.log(`Đang thử kết nối lại sau ${timeToReconnect} giây...`);
            setTimeout(createDatabaseConnection, timeToReconnect * 1000);
        }
    });

    return pool;
}
const pool = createDatabaseConnection();

export default pool;
