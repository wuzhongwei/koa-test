import router from './router'
import {useUserStore} from './stores/user'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login'] // 白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done()
    } else {
      const hasRoles = useUserStore.getters.roles && useUserStore.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {

          const { roles } = await useUserStore.dispatch('user/getInfo')

          const accessRoutes = await useUserStore.dispatch('permission/generateRoutes', roles)

          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          await useUserStore.dispatch('user/resetToken')
          ElMessage({message: error || '有错误', type: 'error'})
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})