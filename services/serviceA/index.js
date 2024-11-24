import Fastify from 'fastify';
import config from './config.js';

const fastify = Fastify({ logger: true });

fastify.get('/ping', async (request, reply) => {
  const delay = Math.floor(
    Math.random() * (config.RESPONSE_MAX_TIME - config.RESPONSE_MIN_TIME + 1)
  ) + config.RESPONSE_MIN_TIME;

  await new Promise((resolve) => setTimeout(resolve, delay));
  reply.send('OK');
});

fastify.listen({ port: config.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Service A is running on ${address}`);
});
