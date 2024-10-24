/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function login(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('http://localhost:8080/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function register(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('http://localhost:8080/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
