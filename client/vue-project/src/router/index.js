import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/list',
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/add',
          name: 'add',
          component: () => import('../views/Add.vue')
        },
        {
          path: '/list',
          name: 'list',
          component: () => import('../views/List.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '没有此页面',
      },
      component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    },
    { 
      path: '/:id*',
      redirect: { name: '404' }
    } 
  ]
})

export default router
