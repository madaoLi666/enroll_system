import request from '@/utils/request';

export async function login(
  body?: API.Result,
  options?: { [key: string]: any },
) {
  return request('/user/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function register(
  body?: API.Result,
  options?: { [key: string]: any },
) {
  return request('/user/register', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
