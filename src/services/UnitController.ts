import request from '@/utils/request';

export async function getInfo(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/unit/info', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

export async function updateInfo(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/unit/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
