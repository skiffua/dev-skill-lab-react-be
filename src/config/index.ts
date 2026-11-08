import dotenv from 'dotenv';
import type { Config } from '@/types';

// Load environment variables
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('Attention: JWT_SECRET doesn`t exit in the .env file!');
  process.exit(1);
}

export const config: Config = {
  port: Number(process.env.PORT) || 4000,
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  apiPrefix: process.env.API_PREFIX || '/api',
  jwtSecret: process.env.JWT_SECRET || '',
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';
