import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ApiResponse } from '@/types';

interface LoginBody {
  userName: string;
}

type AuthData = {
  accessToken: string;
};

/**
 * Login - sign in with token
 */
export const login = async (
  request: FastifyRequest<{
    Body: LoginBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { userName } = request.body;
  const payload = {
    userName,
  };

  const token = request.server.jwt.sign(payload, {
    expiresIn: '7d',
  });

  const data: AuthData = { accessToken: token };

  const response: ApiResponse<AuthData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply
    .code(200)
    .setCookie('token', token, { path: '/', httpOnly: true, secure: true, sameSite: 'none' })
    .send(response);
};
