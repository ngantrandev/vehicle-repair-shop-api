import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import { sendResponse } from '@/src/ultil/ultil.lib';

export const errorLogger = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('\x1b[31m', err.stack, '\x1b[0m');
    next(err);
};

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    sendResponse(
        res,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        err.message || 'Something went wrong'
    );

    next();
};
