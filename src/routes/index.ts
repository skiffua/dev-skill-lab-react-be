import type { FastifyInstance } from 'fastify';
import * as chartController from '@/controllers/chart.controller';
import * as weatherController from '@/controllers/weather.controller';
import * as statsController from '@/controllers/stats.controller';
import * as userController from '@/controllers/user.controller';

export async function registerRoutes(app: FastifyInstance) {
  // Health check
  app.get('/health', async (_request, reply) => {
    reply.send({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    });
  });

  // Root endpoint
  app.get('/', async (_request, reply) => {
    reply.send({
      name: 'Dev Skill Lab API',
      version: '1.0.0',
      description: 'Modern Node.js backend for dev-skill-lab-react',
      endpoints: {
        health: '/health',
        chart: '/api/chart-data, /api/monthly-data, /api/quarterly-data, /api/random-data',
        weather: '/api/weather, /api/weather/random, /api/weather/forecast',
        stats: '/api/stats, /api/stats/dashboard, /api/stats/performance, /api/stats/realtime',
        users: '/api/users (GET, POST), /api/users/:id (GET, PUT, DELETE)',
      },
      timestamp: new Date().toISOString(),
    });
  });

  // Chart routes
  app.get('/api/chart-data', chartController.getChartData);
  app.get('/api/monthly-data', chartController.getMonthlyData);
  app.get('/api/quarterly-data', chartController.getQuarterlyData);
  app.get('/api/random-data', chartController.getRandomData);

  // Weather routes
  app.get('/api/weather', weatherController.getWeather);
  app.get('/api/weather/random', weatherController.getRandomWeather);
  app.get('/api/weather/forecast', weatherController.getForecast);

  // Stats routes
  app.get('/api/stats', statsController.getStats);
  app.get('/api/stats/dashboard', statsController.getDashboardStats);
  app.get('/api/stats/performance', statsController.getPerformanceMetrics);
  app.get('/api/stats/realtime', statsController.getRealTimeStats);

  // User routes (CRUD)
  app.get('/api/users', userController.getUsers);
  app.get('/api/users/:id', userController.getUserById);
  app.post('/api/users', userController.createUser);
  app.put('/api/users/:id', userController.updateUser);
  app.delete('/api/users/:id', userController.deleteUser);
}
