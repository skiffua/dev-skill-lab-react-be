import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { config, isDevelopment } from '@/config';
import { registerRoutes } from '@/routes';

export async function buildApp() {
  // Create Fastify instance
  const app = Fastify({
    logger: {
      level: isDevelopment ? 'info' : 'error',
      transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
              colorize: true,
            },
          }
        : undefined,
    },
  });

  // Register helmet for security headers
  await app.register(helmet, {
    contentSecurityPolicy: false, // Disable for API
  });

  // Register CORS
  await app.register(cors, {
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Global error handler
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);

    const statusCode = (error as { statusCode?: number }).statusCode || 500;
    const message = (error as { message?: string }).message || 'Internal Server Error';

    reply.status(statusCode).send({
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    });
  });

  // Not found handler
  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      success: false,
      error: 'Route not found',
      timestamp: new Date().toISOString(),
    });
  });

  // Register routes
  await registerRoutes(app);

  return app;
}
