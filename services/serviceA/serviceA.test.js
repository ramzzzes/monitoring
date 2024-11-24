import Fastify from 'fastify';
import config from './config.js';

describe('Service A Tests', () => {
  let app;

  beforeAll(async () => {
    app = Fastify();
    app.get('/ping', async (request, reply) => {
      const delay = Math.floor(
        Math.random() * (config.RESPONSE_MAX_TIME - config.RESPONSE_MIN_TIME + 1)
      ) + config.RESPONSE_MIN_TIME;

      await new Promise((resolve) => setTimeout(resolve, delay));
      reply.send('OK');
    });

    await app.listen({ port: config.PORT });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should respond with OK', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/ping',
    });
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('OK');
  });
});
