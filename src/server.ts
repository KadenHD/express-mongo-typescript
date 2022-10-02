import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';

const StartServer = async () => {
    try {
        const router: Express = express();
        /** Connect to Mongo */
        await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
        Logging.info(`Connected to mongoDB, using '${config.mongo.name}' DataBase.`);
        /** Only start the server if Mongo Connects */
        router.use(express.urlencoded({ extended: true }));
        router.use(express.json());

        router.use((req: Request, res: Response, next: NextFunction) => {
            /** Log the Request */
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

            res.on('finish', () => {
                Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
            });

            next();
        });

        /** Routes */
        router.use('/authors', authorRoutes);
        router.use('/books', bookRoutes);

        /** Healthcheck */
        router.get('/ping', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'pong' }));

        /** Error handling */
        router.use((req: Request, res: Response, next: NextFunction) => {
            const error: Error = new Error('Not found');
            Logging.error(error);

            return res.status(404).json({ message: error.message });
        });
        http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on address : ${config.server.host}.`));
    } catch (error) {
        Logging.error('Unable to connect to mongoDB : ');
        Logging.error(error);
    }
};

StartServer();
