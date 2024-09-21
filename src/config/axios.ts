import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosScout = axios.create({
  baseURL: '/scout',
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

export const axiosLoopingPositions = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosScout;
