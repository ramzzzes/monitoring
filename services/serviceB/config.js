import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.SERVICE_B_PORT || 4000,
  REQUEST_DELAY: Number(process.env.REQUEST_DELAY) || 1000,
  STATISTICS_WINDOW: Number(process.env.STATISTICS_WINDOW) || 10,
  DATA_PATH: process.env.DATA_PATH || './data',
};
