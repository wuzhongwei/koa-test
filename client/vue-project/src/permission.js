import router from './router'
import {useUserStore} from './stores/user'
import {usePermissionStore} from './stores/permission'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/mobile', '/register'] // 白名单
router.beforeEach(async(to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done()
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await userStore.getInfo()

          const accessRoutes = await permissionStore.generateRoutes(roles)
          accessRoutes.forEach((item) => {
            router.addRoute(item)
          })

          next({ ...to, replace: true })
        } catch (error) {
          await userStore.resetToken()
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