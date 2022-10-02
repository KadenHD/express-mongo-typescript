import request from 'supertest';
import { config } from '../config/config';

const res = async (route: string) => {
    return await request(config.server.host).get(route);
};

describe('src/server.ts', () => {
    describe('GET /ping', () => {
        const route: string = '/ping';
        it('returns pong', async () => {
            expect((await res(route)).body.message).toEqual('pong');
        });

        it('returns status 200', async () => {
            expect((await res(route)).statusCode).toEqual(200);
        });
    });

    describe('GET /undefinedRoutesOrMethods', () => {
        const route: string = '/undefinedRoutesOrMethods';
        it('returns Not found', async () => {
            expect((await res(route)).body.message).toEqual('Not found');
        });

        it('returns status 404', async () => {
            expect((await res(route)).statusCode).toEqual(404);
        });
    });
});
