import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const constantRoutes = [
  {
    path: '/',
    redirect: '/list',
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页面',
    },
    component: () => import('../views/Login.vue')
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

const asyncRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/add',
        name: 'add',
        meta: {
          title: '添加',
        },
        component: () => import('../views/Add.vue')
      },
      {
        path: '/list',
        name: 'list',
        meta: {
          title: '列表',
          roles: [''] //权限
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes.concat(asyncRoutes)
})


export default router
