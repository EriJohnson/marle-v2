import { User } from '@/types/User';
import HttpClient from './utils/HttpClient';

export type LoggedUser = Pick<User, 'id' | 'fullName' | 'role' | 'club'>;

export interface ILoginRequest {
  identifier: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: LoggedUser;
}

const AuthService = {
  login: async (request: ILoginRequest) => {
    const { data } = await HttpClient.post<ILoginResponse>(
      '/auth/login',
      request
    );

    HttpClient.defaults.headers.common.authorization = `Bearer ${data?.token}`;

    localStorage.setItem('OANSE@token', data?.token);

    return data;
  },
};

export default AuthService;
