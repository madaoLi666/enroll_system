// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

import type { RequestConfig } from 'umi';

const DEBUG_ORIGIN = 'http://localhost:8080';

export const request: RequestConfig = {
  timeout: 10000,
  baseURL: DEBUG_ORIGIN,
  headers: {},
  responseInterceptors: [
    (response) => {
      console.log(response);
      return response;
    },
  ],
};
