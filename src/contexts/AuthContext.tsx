import useLocalStorage from '@/hooks/useLocalStorage';
import HttpClient from '@/services/utils/HttpClient';
import AuthService, { ILoginRequest, LoggedUser } from '@/services/AuthService';
import { Toast, useToast } from '@chakra-ui/react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IAuthContext {
  user: LoggedUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin: (payload: ILoginRequest) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [user, setUser] = useLocalStorage<LoggedUser>('user', {} as LoggedUser);

  // Retorna para página que o usuário estava tentando acessar antes de
  // fazer o login
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const token = localStorage.getItem('OANSE@token');

    if (token) {
      HttpClient.defaults.headers.common.authorization = `Bearer ${token}`;
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  async function handleLogin(payload: ILoginRequest) {
    try {
      setIsLoading(true);

      const response = await AuthService.login(payload);

      setUser(response?.user);

      setIsAuthenticated(true);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message || 'Tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);

    localStorage.removeItem('OANSE@user');
    localStorage.removeItem('OANSE@token');

    delete HttpClient.defaults.headers.common.authorization;

    navigate('/login');
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      handleLogin,
      handleLogout,
    }),
    [user, isLoading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
