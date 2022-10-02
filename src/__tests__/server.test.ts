import server from '../server';
import request from 'supertest';

describe('POST /ping', () => {
    it('returns pong', async () => {
        const res = await request(server).post('/ping');
        expect(res.body.message).toEqual('pong');
    });
});
