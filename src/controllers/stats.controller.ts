import type { FastifyRequest, FastifyReply } from 'fastify';
import type { StatsData, ApiResponse } from '@/types';

/**
 * Get general statistics
 */
export const getStats = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data: StatsData = {
    users: 1250,
    revenue: 45000,
    growth: 15.3,
    period: 'Q4 2024',
  };

  const response: ApiResponse<StatsData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get dashboard stats (multiple metrics)
 */
export const getDashboardStats = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data = {
    overview: {
      totalUsers: 1250,
      activeUsers: 987,
      newUsers: 143,
      churnRate: 2.1,
    },
    revenue: {
      total: 45000,
      recurring: 38000,
      oneTime: 7000,
      growth: 15.3,
    },
    engagement: {
      avgSessionDuration: 12.5, // minutes
      pageViews: 45678,
      bounceRate: 42.3,
      conversionRate: 3.8,
    },
    period: 'Last 30 days',
  };

  const response: ApiResponse<typeof data> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get performance metrics
 */
export const getPerformanceMetrics = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data = {
    server: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
    },
    api: {
      totalRequests: Math.floor(Math.random() * 10000),
      avgResponseTime: Math.floor(Math.random() * 200) + 50, // 50-250ms
      errorRate: (Math.random() * 2).toFixed(2), // 0-2%
    },
    timestamp: new Date().toISOString(),
  };

  const response: ApiResponse<typeof data> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get real-time stats (simulated)
 */
export const getRealTimeStats = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data = {
    activeUsers: Math.floor(Math.random() * 200) + 50,
    requestsPerSecond: Math.floor(Math.random() * 100) + 10,
    avgLoadTime: (Math.random() * 2 + 0.5).toFixed(2),
    errorCount: Math.floor(Math.random() * 5),
    timestamp: new Date().toISOString(),
  };

  const response: ApiResponse<typeof data> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};
