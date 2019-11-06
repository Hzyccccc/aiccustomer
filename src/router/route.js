/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2018-01-17 15:01
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

import Layout from 'src/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
};

// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};

// 作为main组件子页面展示  但不在左侧菜单显示的路由卸载otherRoter里
export const otherRouter = {
  path: '',
  name: 'otherRouter',
  redirect: '/home',
  meta: {
    requireAuth: true
  },
  component: Layout,
  children: [
    {
      path: 'home',
      name: 'home',
      title: '首页',
      component: () => import('src/pages/view/home/index')
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/home',
    name: 'home',
    title: '首页',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'home1',
        title: '首页',
        component: () => import('src/pages/view/home/index.vue')
      }
    ]
  },
  {
    path: '/service',
    name: 'service',
    title: '我的关注服务',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'service_index',
        title: '我的关注服务',
        component: () => import('src/pages/view/service/index')
      }
    ]
  },
  {
    path: '/supplier',
    name: 'supplier',
    title: '订阅服务管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'Already',
        name: 'Already',
        title: '已订阅服务列表',
        component: () => import('src/pages/view/supplier/Already')
      },
      {
        path: 'added',
        name: 'added',
        title: '+新增订阅服务',
        component: () => import('src/pages/view/supplier/added')
      }
    ]
  },
  {
    path: '/Subscription',
    name: 'Subscription',
    title: '订阅服务监控',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'ServiceRecord',
        name: 'ServiceRecord',
        title: '服务推送记录',
        component: () => import('src/pages/view/Subscription/ServiceRecord')
      },
      {
        path: 'CallRecord',
        name: 'CallRecord',
        title: '接口调用记录',
        component: () => import('src/pages/view/Subscription/callRecord')
      }
    ]
  },
  {
    path: '/myJob',
    name: 'myJob',
    title: '我的使用记录',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'useRecords',
        name: 'myJob_useRecords',
        title: '我的使用记录',
        component: () => import('src/pages/myJob/useRecords')
      }
    ]
  },
  {
    path: '/myJob',
    name: 'myJob',
    title: '我的操作记录',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'operatingLog',
        name: 'myJob_operatingLog',
        title: '我的操作记录',
        component: () => import('src/pages/myJob/operatingLog')
      }
    ]
  }
];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  ...appRouter
];
