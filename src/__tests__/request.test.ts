import request from 'supertest';
import { config } from '../config/config';

describe('GET /ping', () => {
    it('returns pong', async () => {
        const res = await request(config.server.host).get('/ping');
        expect(res.body.message).toEqual('pong');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /undefinedRoutesOrMethods', () => {
    it('returns Not found', async () => {
        const res = await request(config.server.host).get('/undefinedRoutesOrMethods');
        expect(res.body.message).toEqual('Not found');
        expect(res.statusCode).toEqual(404);
    });
});
