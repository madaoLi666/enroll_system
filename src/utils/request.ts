import { history } from '@umijs/max';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { responseFormatter } from './format';
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

function responseErrorHandling(error: AxiosError) {
  if (error.status === 401) {
    history.push('/login');
  }
}

// 拦截401
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 这里已经是请求正常德
    return responseFormatter(response);
  },
  (err: AxiosError) => {
    responseErrorHandling(err);
    // 这个位置应该处理掉error里面的信息
    // Promise reject只需要告诉组件这个请求失败了就行了
    // 并不需要把错误信息往下传递（但暂时先直接传下去）
    return Promise.reject(err);
  },
);

export default instance;
