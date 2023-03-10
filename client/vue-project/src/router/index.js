import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

export const constantRoutes = [ // 固定页面
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页面',
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/mobile',
    name: 'mobile',
    meta: {
      title: '亮景眼镜',
    },
    component: () => import('../views/Mobile.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '没有此页面',
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
  }
]

export const asyncRoutes = [ // 权限页面
  {
    path: '/',
    component: Home,
    redirect: '/list',
    meta: {
      roles: ['admin'] //权限
    },
    children: [
      {
        path: '/add',
        name: 'add',
        meta: {
          title: '添加',
          roles: ['admin'] //权限
        },
        component: () => import('../views/Add.vue')
      },
      {
        path: '/list',
        name: 'list',
        meta: {
          title: '列表',
          roles: ['admin'] //权限
        },
        component: () => import('../views/List.vue')
      }
    ]
  },
  { 
    path: '/:id*',
    redirect: { name: '404', hidden: true }
  }
]


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})


export default router
