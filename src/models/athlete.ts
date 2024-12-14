import { getAthleteListByUserId } from '@/services/AthleteController';

export default {
  namespace: 'athlete',
  state: {
    athletes: [],
  },
  effects: {
    *queryAthlete({ payload }: any, { call, put }: any) {
      // @ts-ignore
      const athleteList = yield call(getAthleteListByUserId, payload);
      console.log(athleteList);
      yield put({ type: 'setAthletes', payload: athleteList });
    },
  },
  reducers: {
    setAthletes(state: any, { payload }: any) {
      return {
        ...state,
        athletes: payload,
      };
    },
  },
};
