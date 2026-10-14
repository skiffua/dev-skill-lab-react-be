# Backend Project Guidelines

## Stack

- **Node.js 20+** with TypeScript 5
- **Fastify 5** - Fast and low overhead web framework
- **Zod** - TypeScript-first schema validation
- **ESM** - ES Modules (type: "module")
- **tsx** - TypeScript execution for development

## Code Style

- Use ESLint + Prettier
- Prefer `async/await` over promises
- Use explicit return types for functions
- Follow REST API conventions
- Use meaningful variable names

## Project Structure

```
src/
  config/       - Configuration and environment
  controllers/  - Business logic and request handlers
  routes/       - Route definitions
  types/        - TypeScript types and Zod schemas
  app.ts        - Fastify app setup
  server.ts     - Entry point
```

## API Design

- Use RESTful conventions
- Return consistent response format:
  ```json
  {
    "success": true,
    "data": {},
    "timestamp": "ISO-8601"
  }
  ```
- Use proper HTTP status codes
- Handle errors gracefully

## Development

- Use `npm run dev` for hot reload
- Use `npm run type-check` before commits
- Format code with Prettier
- No console.log in production (use logger)

## Security

- CORS is enabled for configured origins
- Helmet for security headers
- Input validation with Zod (TODO)
- No sensitive data in logs
