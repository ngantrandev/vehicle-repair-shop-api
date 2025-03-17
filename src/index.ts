import { NextFunction, Request, Response } from 'express';

import express from 'express';
const cors = require('cors');
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { BASE_URL_PATH, APP_NAME } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';

dotenv.config();

import { swaggerDocs, swaggerUi } from '@/src/configs/swagger.config'; // Import Swagger

import { logger } from '@/src/configs/logger.config'; // Import Logger
import apiRoutes from '@/src/routes/api.route';
import { downloadFile, getDeviceIp } from '@/src/ultil/ultil.lib';
import { errorHandler, errorLogger } from '@/src/middlewares/error.middleware';
const deviceIp = getDeviceIp();

const filePath = './fcm.serviceaccount.key.json';

const appPort = process.env.APP_PORT || 8000;
const sslPath = process.env.SSL_PATH || path.join(process.cwd(), 'ssl');

// 🔹 Kiểm tra chứng chỉ SSL
const keyPath = path.join(sslPath, 'server.key');
const certPath = path.join(sslPath, 'server.cert');

const app = express();

const initialApp = () => {
    app.use(cors({ origin: '*', credentials: true }));
    app.use(bodyparser.json({ limit: '50mb' }));

    ['uploads', 'invoices'].forEach((folder) => {
        const dirPath = path.join(__dirname, folder);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            console.log(`${folder} folder created successfully!`);
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

    app.use(BASE_URL_PATH, apiRoutes);
    app.use(errorLogger);
    app.use(errorHandler);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // 🔹 Chạy HTTPS nếu có chứng chỉ, ngược lại chạy HTTP
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        const options = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
        };

        https.createServer(options, app).listen(8000, '0.0.0.0', () => {
            console.log('🚀 HTTPS Server running on https://0.0.0.0:8000');
        });
    } else {
        app.listen(appPort, () => {
            console.log(
                `✅ HTTP Server running on http://${deviceIp}:${appPort}`
            );
        });
    }
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
