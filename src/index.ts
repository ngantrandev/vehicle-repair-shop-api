import { NextFunction, Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const winston = require('winston');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
var os = require('os');

interface LogInfo {
    method: string;
    path: string;
    duration: number;
    statusCode: number;
}

// config logger
const logger = winston.createLogger({
    level: 'info', // log level (info, warn, error)
    transports: [
        // Console Transport:
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    ({ method, path, duration, statusCode }: LogInfo) => {
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
Object.keys(ips).forEach(function (_interface: string) {
    ips[_interface].forEach(function (_dev: any) {
        if (_dev.family === 'IPv4' && !_dev.internal) ip = _dev.address;
    });
});

dotenv.config();
const app = express();
import { downloadFile } from '@/src/ultil/ultil.lib';

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

    fs.access('./uploads', (error: NodeJS.ErrnoException | null) => {
        if (error) {
            fs.mkdirSync('./uploads');
            console.log('Uploads folder created successfully!');
        }
    });

    fs.access('./invoices', (error: NodeJS.ErrnoException | null) => {
        if (error) {
            fs.mkdirSync('./invoices');
            console.log('Invoices folder created successfully!');
        }
    });

    app.use((req: Request, res: Response, next: NextFunction) => {
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

    app.get('/', (req: Request, res: Response) => {
        res.status(STATUS_CODE.OK).json('Hello World!');
    });

    app.get(BASE_URL_PATH, (req: Request, res: Response) => {
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

export default app;
