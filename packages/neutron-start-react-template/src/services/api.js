import axios from 'axios';
import storage from '@/utils/storage';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();

  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;
