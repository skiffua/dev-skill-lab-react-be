import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ChartData, ApiResponse } from '@/types';

/**
 * Get chart data - monthly sales example
 */
export const getChartData = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [65, 59, 80, 81, 56, 72],
  };

  const response: ApiResponse<ChartData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get monthly data - full year
 */
export const getMonthlyData = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [30, 45, 60, 55, 70, 85, 90, 75, 80, 95, 88, 100],
  };

  const response: ApiResponse<ChartData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get quarterly data
 */
export const getQuarterlyData = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [155, 206, 245, 283],
  };

  const response: ApiResponse<ChartData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get random chart data (for testing animations)
 */
export const getRandomData = async (
  request: FastifyRequest<{ Querystring: { points?: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const points = Number(request.query.points) || 10;
  const labels = Array.from({ length: points }, (_, i) => `Point ${i + 1}`);
  const values = Array.from({ length: points }, () => Math.floor(Math.random() * 100));

  const data: ChartData = { labels, values };

  const response: ApiResponse<ChartData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};
