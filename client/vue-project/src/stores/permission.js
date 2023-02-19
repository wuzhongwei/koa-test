import { defineStore } from 'pinia'

import { asyncRoutes, constantRoutes } from '@/router'

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return { 
      addRoutes: [], // 新添加router
      routes: [] // 总router
    }
  },
  actions: {
    generateRoutes(roles) {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = this.filterAsyncRoutes(asyncRoutes, roles)
      }
      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)
      return accessedRoutes
    },
    filterAsyncRoutes(routes, roles) {
      const res = []

      routes.forEach(route => {
        const tmp = { ...route }
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, roles)
          }
          res.push(tmp)
        }
      })

      return res
    },
    hasPermission(roles, route) {
      if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
      } else {
        return true
      }
    }
  },
})