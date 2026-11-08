import fp from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// Загортаємо плагін у fp(), щоб декоратор був доступний у всьому додатку
export default fp(async function (app: FastifyInstance) {
  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.cookies.token;
      if (!token) {
        return reply.code(401).send({ error: 'Not authorized to authenticate: missed token' });
      }

      // If verification fails (expired, invalid signature, etc.),
      // it throws an error and jumps straight to the catch block
      request.user = request.server.jwt.verify(token);
    } catch {
      reply.code(401).send({ error: 'Not authorized to authenticate' });
    }
  });
});