import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ApiResponse } from '@/types';

type UserData = {
  user: any;
};

/**
 * Login - sign in with token
 */
export const isAuthCheck = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const user = request.user;

  const data: UserData = { user };

  const response: ApiResponse<UserData> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  reply
    .code(200)
    .send(response);
};
