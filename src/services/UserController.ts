import request from '@/utils/request';

export async function login(
  body?: API.Result,
  options?: { [key: string]: any },
) {
  return request('http://localhost:8080/user/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function register(
  body?: API.Result,
  options?: { [key: string]: any },
) {
  return request('http://localhost:8080/user/register', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
