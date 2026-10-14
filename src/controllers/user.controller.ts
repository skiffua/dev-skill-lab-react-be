import type { FastifyRequest, FastifyReply } from 'fastify';
import type { UserData, ApiResponse } from '@/types';

// Mock users database
let users: UserData[] = [
  {
    id: 1,
    name: 'Oleh Mushora',
    email: 'oleh@example.com',
    role: 'admin',
    active: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    active: true,
    createdAt: '2024-03-20T14:30:00Z',
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    active: false,
    createdAt: '2024-02-10T09:15:00Z',
  },
];

/**
 * Get all users
 */
export const getUsers = async (
  request: FastifyRequest<{ Querystring: { active?: string; role?: string } }>,
  reply: FastifyReply
): Promise<void> => {
  let filteredUsers = [...users];

  // Filter by active status
  if (request.query.active !== undefined) {
    const isActive = request.query.active === 'true';
    filteredUsers = filteredUsers.filter((user) => user.active === isActive);
  }

  // Filter by role
  if (request.query.role) {
    filteredUsers = filteredUsers.filter((user) => user.role === request.query.role);
  }

  const response: ApiResponse<UserData[]> = {
    success: true,
    data: filteredUsers,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Get user by ID
 */
export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = Number(request.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'User not found',
      timestamp: new Date().toISOString(),
    };
    reply.code(404).send(response);
    return;
  }

  const response: ApiResponse<UserData> = {
    success: true,
    data: user,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Create new user
 */
export const createUser = async (
  request: FastifyRequest<{
    Body: { name: string; email: string; role?: 'admin' | 'user' | 'guest' };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { name, email, role = 'user' } = request.body;

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'User with this email already exists',
      timestamp: new Date().toISOString(),
    };
    reply.code(400).send(response);
    return;
  }

  const newUser: UserData = {
    id: Math.max(...users.map((u) => u.id), 0) + 1,
    name,
    email,
    role,
    active: true,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  const response: ApiResponse<UserData> = {
    success: true,
    data: newUser,
    timestamp: new Date().toISOString(),
  };

  reply.code(201).send(response);
};

/**
 * Update user
 */
export const updateUser = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<Omit<UserData, 'id' | 'createdAt'>>;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = Number(request.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'User not found',
      timestamp: new Date().toISOString(),
    };
    reply.code(404).send(response);
    return;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...request.body,
  };

  const response: ApiResponse<UserData> = {
    success: true,
    data: users[userIndex],
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};

/**
 * Delete user
 */
export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = Number(request.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'User not found',
      timestamp: new Date().toISOString(),
    };
    reply.code(404).send(response);
    return;
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  const response: ApiResponse<UserData> = {
    success: true,
    data: deletedUser,
    timestamp: new Date().toISOString(),
  };

  reply.code(200).send(response);
};
