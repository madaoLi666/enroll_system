// 全局共享数据示例
import {
  getGameList as queryGameAPI,
  createItem as createItemAPI,
  queryItem as queryItemAPI,
} from '@/services/GameController';


export default {
  namespace: 'game',
  state: {
    games: [],
    gameInfo: {},
    items: [],
  },
  effects: {
    *queryGame({ payload }: any, { call, put }: any) {
      // @ts-ignore
      const gameList = yield call(queryGameAPI);
      yield put({ type: 'setGames', payload: gameList});
    },
    *queryItem({ payload }: any, { call, put }: any) {
      // @ts-ignore
      const itemList = yield call(queryItemAPI, payload);
      yield put({ type: 'setItems', payload: itemList });
    },
    *item({ payload }: any, { call, put, select }: any) {
      // @ts-ignore
      const response = yield call(createItemAPI, payload);
      if (!response) {
        return false;
      }
      // @ts-ignore
      const gameId = yield select((state) => {
        return state['game']['gameInfo']['id'];
      });
      put({ type: 'queryItem', payload: { gameId: gameId } });
      return true;
    },
  },
  reducers: {
    setGames(state: any, { payload }: any) {
      return {
        ...state,
        games: payload
      }
    },
    setGameInfo(state: any, { payload }: any) {
      return {
        ...state,
        gameInfo: payload,
      };
    },
    setItems(state: any, { payload }: any) {
      return {
        ...state,
        items: payload,
      };
    },
  },
};
