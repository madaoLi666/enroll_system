import request from '@/utils/request';
// header中的token就是userId，就可以查询到添加了哪些运动员
export async function getAthleteListByUserId(
  params: {
    userId: string;
  },
  options?: { [key: string]: any },
) {
  return request('/athlete/getListByUserId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addAthlete(
  body?: API.AthleteInfo,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/athlete/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateAthleteInfo(
  body?: API.AthleteInfo,
  options?: { [key: string]: any },
) {
  return request<API.Result>('http://localhost:8080/athlete/updateInfo', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
