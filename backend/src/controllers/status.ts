import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { version } from '../../package.json'

const NAMESPACE: string = 'Status Controller';

const healthStatusCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Health status check route called.`);

    return res.status(200).json({
        error: null,
        message: {
            api_version: `v${version}`,
            timestamp: new Date().getTime()
        }
    });
};

export default { healthStatusCheck };
