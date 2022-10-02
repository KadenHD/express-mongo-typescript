import dotenv from 'dotenv';
import ip from 'ip';

dotenv.config();

let path: string;
if (process.env.NODE_ENV === 'production') {
    path = `${__dirname}/../../.env.production`;
} else {
    path = `${__dirname}/../../.env.development`;
}

dotenv.config({ path: path });

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';
const MONGO_NAME: string = process.env.MONGO_NAME || '';
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.f3sohen.mongodb.net/${MONGO_NAME}`;

const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
const SERVER_HOST: string = `http://${ip.address()}:${SERVER_PORT}` || `http://localhost:${SERVER_PORT}`;

interface IConfig {
    mongo: {
        url: string;
        name: string;
    };
    server: {
        port: number;
        host: string;
    };
}

export const config: IConfig = {
    mongo: {
        url: MONGO_URL,
        name: MONGO_NAME
    },
    server: {
        port: SERVER_PORT,
        host: SERVER_HOST
    }
};
