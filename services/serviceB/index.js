import Fastify from 'fastify';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import config from './config.js';
import Manager from './Manager.js';
import logger from '../../utils/logger.js';

const fastify = Fastify({ logger: true });
const manager = new Manager(config.STATISTICS_WINDOW);

async function fetchServiceA() {
  try {
    const start = Date.now();
    await axios.get('http://localhost:3000/ping');
    const responseTime = Date.now() - start;
    manager.record(responseTime);
  } catch (err) {
    console.error('Error fetching Service A:', err.message);
  }
}

async function saveStatsToFile() {
  const now = new Date();
  const day = now.toISOString().split('T')[0];
  const hour = String(now.getHours()).padStart(2, '0');
  const timestamp = now.toISOString();

  const stats = manager.getStats();
  const dirPath = path.join(config.DATA_PATH, day, hour);
  const filePath = path.join(dirPath, `${timestamp}.json`);

  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(stats, null, 2));
  logger.info(`Saved stats to ${filePath}`);
}

setInterval(fetchServiceA, config.REQUEST_DELAY);
setInterval(saveStatsToFile, 5 * 60 * 1000); //5 minute

fastify.get('/stats', async (request, reply) => {
  reply.send({
    uptime: process.uptime(),
    ...manager.getStats(),
  });
});

fastify.listen({ port: config.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Service B is running on ${address}`);
});
