import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.SERVICE_A_PORT || 3000,
  RESPONSE_MIN_TIME: Number(process.env.RESPONSE_MIN_TIME) || 20,
  RESPONSE_MAX_TIME: Number(process.env.RESPONSE_MAX_TIME) || 5000,
};
