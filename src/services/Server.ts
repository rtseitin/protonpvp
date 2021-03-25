import express, { Express } from 'express';
import logging from '../config/logging';
import http from 'http';
import { IServerConfigurationType } from 'src/config';
import statusRoute from '../routes/status';
import staffRoute from '../routes/staff';
import cors from 'cors';
export class ServerService {
    private _serverConfig: IServerConfigurationType;
    private NAMESPACE: string = 'Server';
    private router: Express;

    constructor(serverConfig: IServerConfigurationType) {
        this._serverConfig = serverConfig;
        this.init();
    }

    private init() {
        this.router = express();

        /** MIDDLEWARE */
        this.middlewareInit();

        /** ROUTES */
        this.routes();

        const httpServer = http.createServer(this.router);
        httpServer.listen(this._serverConfig.port, () => logging.info(this.NAMESPACE, `Server running on ${this._serverConfig.hostname}:${this._serverConfig.port}`));
    }

    private middlewareInit() {
        /** REQUEST LOGGER */
        this.logger();

        /** REQUEST PARSER */
        this.router.use(express.urlencoded({ extended: false }));
        this.router.use(express.json());

        /** REQUEST LIMITER */
        this.limiter();
    }

    private logger() {
        this.router.use((req, res, next) => {
            logging.info(this.NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

            res.on('finish', () => {
                logging.info(this.NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], STATUS - [${res.statusCode}], IP - [${req.socket.remoteAddress}],`);
            });

            next();
        });
    }

    private limiter() {
        this.router.use(cors());
    }

    private errorHandler() {
        this.router.use((req, res, next) => {
            const error = new Error('Requested route could not found.');

            return res.status(404).json({
                error: true,
                message: error.message
            });
        })
    }

    private routes() {
        this.router.use('/status', statusRoute);
        this.router.use('/staff', staffRoute);

        /** ERROR HANDLER */
        this.errorHandler();
    }
}