import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
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
      name: '人员备案',
      path: '/table',
      component: './Table',
    },
    // {
    //   name: '在线报名',
    //   path: '/table',
    //   component: './Table',
    //   wrappers: ['@/wrapper/auth']
    // },
  ],
  npmClient: 'yarn',
});
