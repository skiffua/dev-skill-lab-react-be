import type { FastifyRequest, FastifyReply } from 'fastify';
import type { WeatherData, ApiResponse } from '@/types';

// Mock weather conditions
const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Partly Cloudy'];

/**
 * Get current weather
 */
export const getWeather = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data: WeatherData = {
    temperature: 22,
    humidity: 60,
    conditions: 'Sunny',
    location: 'Kyiv, Ukraine',
    timestamp: new Date().toISOString(),
  };

  const response: ApiResponse<WeatherData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get random weather (for testing)
 */
export const getRandomWeather = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const data: WeatherData = {
    temperature: Math.floor(Math.random() * 35) - 5, // -5 to 30
    humidity: Math.floor(Math.random() * 60) + 30, // 30 to 90
    conditions: conditions[Math.floor(Math.random() * conditions.length)],
    location: 'Kyiv, Ukraine',
    timestamp: new Date().toISOString(),
  };

  const response: ApiResponse<WeatherData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get weather forecast (5 days)
 */
export const getForecast = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const forecast = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      date: date.toISOString().split('T')[0],
      temperature: Math.floor(Math.random() * 20) + 10, // 10 to 30
      humidity: Math.floor(Math.random() * 40) + 40, // 40 to 80
      conditions: conditions[Math.floor(Math.random() * conditions.length)],
    };
  });

  const response: ApiResponse<WeatherData[]> = {
    success: true,
    data: forecast,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};
