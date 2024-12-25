const express = require('express');
const cors = require('cors');
const winston = require('winston');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
var os = require('os');

// config logger
const logger = winston.createLogger({
    level: 'info', // log level (info, warn, error)
    transports: [
        // Console Transport:
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    ({ method, path, duration, statusCode }) => {
                        return `${method} ${statusCode} ${duration} ${path}`;
                    }
                )
            ),
        }),
        // File Transport:
        new winston.transports.File({
            filename: 'combined.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
    ],
});

var ip = '0.0.0.0';
var ips = os.networkInterfaces();
Object.keys(ips).forEach(function (_interface) {
    ips[_interface].forEach(function (_dev) {
        if (_dev.family === 'IPv4' && !_dev.internal) ip = _dev.address;
    });
});

dotenv.config();
const app = express();
const { downloadFile } = require('@/src/ultil/ultil.lib');

const filePath = './fcm.serviceaccount.key.json';

const appPort = process.env.APP_PORT || 3000;

const initialApp = () => {
    const apiRoute = require('@/src/routes/api.route');
    const {
        BASE_URL_PATH,
        APP_NAME,
    } = require('@/src/configs/constants.config');
    const { STATUS_CODE } = require('@/src/configs/status.codes.config');

    app.use(cors());
    app.use(bodyparser.json({ limit: '50mb' }));

    fs.access('./uploads', (error) => {
        if (error) {
            fs.mkdirSync('./uploads');
            console.log('Uploads folder created successfully!');
        }
    });

    fs.access('./invoices', (error) => {
        if (error) {
            fs.mkdirSync('./invoices');
            console.log('Invoices folder created successfully!');
        }
    });

    app.use((req, res, next) => {
        const start = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - start;
            logger.info({
                message: 'Request received',
                path: req.originalUrl,
                method: req.method,
                timestamp: new Date().toISOString(),
                statusCode: res.statusCode,
                duration: `${duration}ms`,
            });
        });

        next();
    });

    app.use(`${BASE_URL_PATH}/uploads`, express.static('uploads'));

    app.use(`${BASE_URL_PATH}/invoices`, express.static('invoices'));

    app.get('/', (req, res) => {
        res.status(STATUS_CODE.OK).json('Hello World!');
    });

    app.get(BASE_URL_PATH, (req, res) => {
        res.status(STATUS_CODE.OK).json(`Welcome to the ${APP_NAME}!`);
    });

    app.use(BASE_URL_PATH, apiRoute);

    app.listen(appPort, () => {
        console.log(`Server is running on http://${ip}:${appPort}`);
    });
};

if (!fs.existsSync(filePath)) {
    downloadFile(process.env.FCM_SERVICE_ACCOUNT_KEY_FILE_URL, filePath).then(
        () => {
            initialApp();
        }
    );
} else {
    initialApp();
}

module.exports = app;
