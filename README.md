# Dev Skill Lab - Backend API

Modern Node.js backend API for [dev-skill-lab-react](https://github.com/yourusername/dev-skill-lab-react) project.

## 🚀 Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Fastify 5
- **Language**: TypeScript 5
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Code Quality**: ESLint, Prettier
- **Dev Tools**: tsx (TypeScript execution)

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
# Start development server with hot reload
npm run dev

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## 🏗️ Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Server health status

### Chart Data
- `GET /api/chart-data` - Get sample chart data (6 months)
- `GET /api/monthly-data` - Get full year monthly data
- `GET /api/quarterly-data` - Get quarterly data
- `GET /api/random-data?points=10` - Get random data points

### Weather
- `GET /api/weather` - Get current weather
- `GET /api/weather/random` - Get random weather data
- `GET /api/weather/forecast` - Get 5-day forecast

### Statistics
- `GET /api/stats` - Get general statistics
- `GET /api/stats/dashboard` - Get dashboard stats (overview, revenue, engagement)
- `GET /api/stats/performance` - Get performance metrics
- `GET /api/stats/realtime` - Get real-time stats (simulated)

### Users (CRUD)
- `GET /api/users` - Get all users (supports `?active=true&role=admin` filters)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 📋 API Response Format

All endpoints return responses in this format:

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-10-14T14:30:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-10-14T14:30:00.000Z"
}
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=4000
HOST=0.0.0.0
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
API_PREFIX=/api
```

## 📁 Project Structure

```
src/
├── config/          # Configuration files
│   └── index.ts
├── controllers/     # Request handlers
│   ├── chart.controller.ts
│   ├── weather.controller.ts
│   ├── stats.controller.ts
│   └── user.controller.ts
├── routes/          # Route definitions
│   └── index.ts
├── types/           # TypeScript types & schemas
│   └── index.ts
├── app.ts           # Fastify app configuration
└── server.ts        # Server entry point
```

## 🧪 Testing Endpoints

### Using cURL:

```bash
# Health check
curl http://localhost:4000/health

# Get chart data
curl http://localhost:4000/api/chart-data

# Get weather
curl http://localhost:4000/api/weather

# Get users
curl http://localhost:4000/api/users

# Create user
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"user"}'
```

### Using Browser:

Open http://localhost:4000 to see available endpoints.

## 🔐 Security Features

- **Helmet**: Security headers
- **CORS**: Configured for frontend origin
- **Input Validation**: Zod schemas (ready to implement)
- **Error Handling**: Global error handler
- **TypeScript**: Type safety

## 🎯 Features

✅ **RESTful API** - Clean REST architecture  
✅ **TypeScript** - Full type safety  
✅ **Fast** - Fastify framework  
✅ **Validation** - Zod schemas  
✅ **CORS** - Configured for React frontend  
✅ **Hot Reload** - tsx watch mode  
✅ **Mock Data** - Ready-to-use controllers  
✅ **Error Handling** - Comprehensive error handling  
✅ **Logging** - Pino logger with pretty print  
✅ **Code Quality** - ESLint + Prettier  

## 🔄 Integration with Frontend

Update your React app's axios client:

```typescript
// lib/api/client.ts
export const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
});
```

Remove or disable mock-adapter:

```typescript
// lib/api/endpoints.ts
// Comment out mock adapter setup
// if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
//   setupMockAdapter(apiClient);
// }
```

## 📝 Example Requests

### Get Chart Data
```bash
GET /api/chart-data
Response:
{
  "success": true,
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "values": [65, 59, 80, 81, 56, 72]
  },
  "timestamp": "2024-10-14T14:30:00.000Z"
}
```

### Get Weather
```bash
GET /api/weather
Response:
{
  "success": true,
  "data": {
    "temperature": 22,
    "humidity": 60,
    "conditions": "Sunny",
    "location": "Kyiv, Ukraine",
    "timestamp": "2024-10-14T14:30:00.000Z"
  },
  "timestamp": "2024-10-14T14:30:00.000Z"
}
```

### Create User
```bash
POST /api/users
Body:
{
  "name": "New User",
  "email": "new@example.com",
  "role": "user"
}

Response:
{
  "success": true,
  "data": {
    "id": 4,
    "name": "New User",
    "email": "new@example.com",
    "role": "user",
    "active": true,
    "createdAt": "2024-10-14T14:30:00.000Z"
  },
  "timestamp": "2024-10-14T14:30:00.000Z"
}
```

## 🚧 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication & JWT
- [ ] Rate limiting
- [ ] Request validation with Zod
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit tests (Vitest)
- [ ] E2E tests
- [ ] Docker support
- [ ] CI/CD pipeline

## 📄 License

MIT

## 👤 Author

Oleh Mushora

---

Built with ❤️ using modern Node.js best practices
