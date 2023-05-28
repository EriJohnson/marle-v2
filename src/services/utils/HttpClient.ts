import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_API_URL;
const { origin } = window.location;

const HttpClient = axios.create({
  baseURL,
});

const token = localStorage.getItem('OANSE@token');
HttpClient.defaults.headers.common.authorization = `Bearer ${token}`;

HttpClient.interceptors.response.use(
  response => response,

  error => {
    if (error.code === 'ERR_NETWORK' || error.code.includes('ECONNREFUSED')) {
      return new Error('Servidor fora do ar ou você está sem internet.');
    }

    if (error.response.status === 403) {
      window.location.href = `${origin}/forbidden`;
    }

    if (error.response.status === 401 && error.config.url !== '/auth/login') {
      window.location.href = `${origin}/unauthorized`;
      localStorage.clear();
    }

    throw error.response.data;
  }
);

export default HttpClient;
