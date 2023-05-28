import { User } from '@/types/User';
import HttpClient from './utils/HttpClient';

const UsersService = {
  create: async (request: Partial<User>) => {
    const response = await HttpClient.post<User>('/users', request);
    return response;
  },

  findAll: async () => {
    const response = await HttpClient.get<User[]>('/users');
    return response.data;
  },
};

export default UsersService;
