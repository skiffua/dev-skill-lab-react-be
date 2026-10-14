# 🔗 Frontend Integration Guide

## Підключення React frontend до Backend API

### 1. Запуск обох серверів

**Backend (port 4000):**
```bash
cd /home/oleh/web/Sites/dev-skill-lab-react-be
npm run dev
```

**Frontend (port 3000):**
```bash
cd /home/oleh/web/Sites/dev-skill-lab-react
npm run dev
```

### 2. Оновлення Frontend конфігурації

Відкрийте файл `lib/api/endpoints.ts` у React проекті:

```typescript
import { apiClient } from './client';
import { setupMockAdapter } from './mock-adapter';

// ЗАКОМЕНТУЙТЕ mock adapter для використання реального API
// if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
//   setupMockAdapter(apiClient);
// }

// Всі endpoint функції залишаються без змін
export const endpoints = {
  getChartData: async () => {
    const response = await apiClient.get('/api/chart-data');
    return response.data;
  },
  // ... інші endpoints
};
```

### 3. Перевірка CORS

CORS вже налаштовано для `http://localhost:3000`. Якщо потрібна інша адреса:

```env
# backend/.env
CORS_ORIGIN=http://localhost:3000
```

### 4. ОновленняbaseURL (якщо потрібно)

Якщо використовуєте інший порт або хост:

**lib/api/client.ts:**
```typescript
export const apiClient = axios.create({
  baseURL: 'http://localhost:4000', // Змініть на адресу бекенду
  timeout: 10000,
});
```

### 5. Тестування інтеграції

Відкрийте React app у браузері:
1. Login: `demo` / `demo123`
2. Перейдіть на `/data-visualization`
3. Натисніть "Fetch Data" на API Data Chart
4. Натисніть "Load Dashboard" на Weather Dashboard

Перевірте Network tab у DevTools - запити повинні йти на `http://localhost:4000/api/*`

### 6. Доступні API endpoints

| Endpoint | Метод | Опис |
|----------|-------|------|
| `/health` | GET | Health check |
| `/api/chart-data` | GET | Chart data (6 months) |
| `/api/monthly-data` | GET | Monthly data (12 months) |
| `/api/quarterly-data` | GET | Quarterly data |
| `/api/random-data?points=10` | GET | Random data points |
| `/api/weather` | GET | Current weather |
| `/api/weather/random` | GET | Random weather |
| `/api/weather/forecast` | GET | 5-day forecast |
| `/api/stats` | GET | General statistics |
| `/api/stats/dashboard` | GET | Dashboard stats |
| `/api/stats/performance` | GET | Performance metrics |
| `/api/stats/realtime` | GET | Real-time stats |
| `/api/users` | GET | List users (with filters) |
| `/api/users/:id` | GET | Get user by ID |
| `/api/users` | POST | Create user |
| `/api/users/:id` | PUT | Update user |
| `/api/users/:id` | DELETE | Delete user |

### 7. Структура відповідей

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-10-14T14:30:00.000Z"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-10-14T14:30:00.000Z"
}
```

### 8. Обробка відповідей у Frontend

Якщо backend повертає `{ success, data }`, оновіть код:

```typescript
// Було:
const data = await response.data;

// Стало:
const response = await apiClient.get('/api/chart-data');
const data = response.data.data; // Перший .data - axios, другий - API response
```

Або створіть wrapper:

```typescript
// lib/api/endpoints.ts
export const endpoints = {
  getChartData: async () => {
    const response = await apiClient.get('/api/chart-data');
    return response.data.data; // Повертаємо тільки data
  },
};
```

### 9. Перевірка роботи

**Terminal 1 (Backend):**
```bash
cd dev-skill-lab-react-be
npm run dev

# Повинно бути:
# 🚀 Server is running!
# Environment: development
# URL: http://localhost:4000
```

**Terminal 2 (Frontend):**
```bash
cd dev-skill-lab-react
npm run dev

# Повинно бути:
# ▲ Next.js 16.3.8
# - Local: http://localhost:3000
```

**Browser DevTools:**
- Відкрийте Network tab
- Натисніть "Fetch Data" на сторінці
- Перевірте, що запити йдуть на `localhost:4000`
- Status code має бути `200 OK`

### 10. Troubleshooting

**CORS Error:**
```
Access to XMLHttpRequest at 'http://localhost:4000/api/...' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Рішення:** Перевірте, що backend запущено і CORS_ORIGIN правильно налаштовано.

**Connection Refused:**
```
Error: connect ECONNREFUSED 127.0.0.1:4000
```

**Рішення:** Backend сервер не запущено. Запустіть `npm run dev` в backend папці.

**404 Not Found:**
```
GET http://localhost:4000/api/chart-data 404 (Not Found)
```

**Рішення:** Перевірте URL endpoint. Можливо, помилка в шляху.

### 11. Production Deployment

Для production налаштуйте environment variables:

**Frontend (.env.production):**
```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

**Backend (.env.production):**
```env
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.com
```

### 12. Додаткові можливості

**Нові endpoints** можна додати в `src/controllers/` та `src/routes/index.ts`

**Валідація** з Zod - схеми вже готові в `src/types/index.ts`

**Автентифікація** - додайте JWT middleware (TODO)

**База даних** - інтегруйте PostgreSQL/MongoDB (TODO)

---

**Готово!** 🎉 Тепер ви маєте повнофункціональний fullstack додаток з React frontend та Node.js backend.
