/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
import type { AxiosRequestHeaders } from 'axios';
const selfHeaders: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
  token: sessionStorage.getItem('token') as string,
};

export async function getInfo(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('http://localhost:8080/unit/info', {
    method: 'GET',
    headers: selfHeaders,
    data: body,
    ...(options || {}),
  });
}

export async function updateInfo(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('http://localhost:8080/unit/update', {
    method: 'POST',
    headers: selfHeaders,
    data: body,
    ...(options || {}),
  });
}
