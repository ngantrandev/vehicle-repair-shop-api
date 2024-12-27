import winston from 'winston';

// config logger
const logger = winston.createLogger({
    level: 'info', // log level (info, warn, error)
    transports: [
        // Console Transport:
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    (info: winston.Logform.TransformableInfo) => {
                        const { method, path, duration, statusCode } = info;
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

export { logger };
