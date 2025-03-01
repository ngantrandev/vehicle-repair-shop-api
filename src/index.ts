import { NextFunction, Request, Response } from 'express';

import express from 'express';
const cors = require('cors');
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import { BASE_URL_PATH, APP_NAME } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';

dotenv.config();

import { swaggerDocs, swaggerUi } from '@/src/configs/swagger.config'; // Import Swagger

import { logger } from '@/src/configs/logger.config'; // Import Logger
import apiRoutes from '@/src/routes/api.route';

const app = express();
import { downloadFile, getDeviceIp } from '@/src/ultil/ultil.lib';
import { errorHandler, errorLogger } from '@/src/middlewares/error.middleware';
const deviceIp = getDeviceIp();

const filePath = './fcm.serviceaccount.key.json';

const appPort = process.env.APP_PORT || 8000;

const initialApp = () => {
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

    app.use(BASE_URL_PATH, apiRoutes);

    app.use(errorLogger);

    app.use(errorHandler);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(appPort, () => {
        console.log(`
            ${'\x1b[31m'}Server is running on https://${deviceIp}:${'\x1b[32m'}${appPort}${'\x1b[0m'}
        `);
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
