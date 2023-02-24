import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      token: getToken() || '',
      roles: [] // 权限
    }
  },
  actions: {
    getInfo() {
      let arr = ['admin']
      this.roles = arr
      return { roles: arr}
    },
    resetToken() {
      this.token = ''
      this.roles = []
      removeToken()
    }
  },
})
