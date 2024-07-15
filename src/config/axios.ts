import axios from 'axios';

export const axiosScout = axios.create({
  baseURL: '/scout',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosCompass = axios.create({
  baseURL: '/compass',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosScout;
