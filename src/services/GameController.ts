import request from '@/utils/request';
// header中的token就是userId，就可以查询到添加了哪些运动员
export async function getGameList(options?: { [key: string]: any }) {
  return request('/games', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createGame(body: any, options?: { [key: string]: any }) {
  return request('/game/create', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateGameInfo(
  body: any,
  options?: { [key: string]: any },
) {
  return request('/game/updateInfo', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ITEM
export async function queryItem(params: any, options?: { [key: string]: any }) {
  return request('/items', {
    params,
    method: 'GET',
    ...(options || {}),
  });
}

export async function createItem(data: any, options: { [key: string]: any }) {
  return request('item', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
