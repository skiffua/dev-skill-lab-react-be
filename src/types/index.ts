import { z } from 'zod';

// Chart Data Schema
export const ChartDataSchema = z.object({
  labels: z.array(z.string()),
  values: z.array(z.number()),
});

export type ChartData = z.infer<typeof ChartDataSchema>;

// Weather Data Schema
export const WeatherDataSchema = z.object({
  temperature: z.number(),
  humidity: z.number(),
  conditions: z.string(),
  location: z.string().optional(),
  timestamp: z.string().optional(),
});

export type WeatherData = z.infer<typeof WeatherDataSchema>;

// Stats Data Schema
export const StatsDataSchema = z.object({
  users: z.number(),
  revenue: z.number(),
  growth: z.number(),
  period: z.string().optional(),
});

export type StatsData = z.infer<typeof StatsDataSchema>;

// User Data Schema
export const UserDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  active: z.boolean(),
  createdAt: z.string(),
});

export type UserData = z.infer<typeof UserDataSchema>;

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Config
export interface Config {
  port: number;
  host: string;
  nodeEnv: string;
  corsOrigin: string;
  apiPrefix: string;
}
