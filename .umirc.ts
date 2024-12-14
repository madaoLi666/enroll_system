import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  dva: {},
  layout: {
    title: '@umijs/max',
    locale: false,
  },
  routes: [
    {
      path: '/login',
      component: './LoginPage',
      layout: false,
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '单位管理',
      path: '/unit',
      component: './Unit',
    },
    {
      name: '运动员管理',
      path: '/athlete',
      component: './Athlete',
    },
    {
      name: '赛事管理',
      path: '/game',
      routes: [
        {
          name: '赛事选择',
          path: 'game',
          component: './Admin/Game',
        },
        {
          name: '项目管理',
          path: 'item',
          component: './Admin/Item',
        },
      ],
    },
    {
      name: '在线报名',
      path: '/enroll',
      component: './Enroll'
    },
  ],
  npmClient: 'yarn',
});
