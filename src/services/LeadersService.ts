import { User } from '@/types/User';
import HttpClient from './utils/HttpClient';

const LeadersService = {
  findAll: async () => {
    const response = await HttpClient.get<User[]>('/users/role/leader');
    return response.data;
  },
};

export default LeadersService;
