import { history } from '@umijs/max';
import axios from 'axios';
const DEBUG_ORIGIN = 'http://localhost:8080';

const instance = axios.create({
  baseURL: DEBUG_ORIGIN,
  timeout: 0, // Debug only
  headers: {
    'Content-Type': 'application/json',
  },
  // 跨域是否要凭证
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  // 实时取出token
  const token = sessionStorage.getItem('token');
  // @ts-ignore
  config.headers = {
    ...config.headers,
    token,
  };
  return config;
});

// 拦截401
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log(err);
    if (err.status === 401) {
      history.push('/login');
    }
    return Promise.reject(err);
  },
);

export default instance;
