import dotenv from 'dotenv';

dotenv.config();

let path;
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

interface IConfig {
    mongo: {
        url: string;
    };
    server: {
        port: number;
    };
}

export const config: IConfig = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
