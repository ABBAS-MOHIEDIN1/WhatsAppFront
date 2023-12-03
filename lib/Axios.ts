import axios from 'axios';
import getCookies from './getCookies';

const Axios = axios.create({
  baseURL: 'http://localhost:8179/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

Axios.interceptors.request.use(async (config) => {
  const token = await getCookies();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default Axios;
