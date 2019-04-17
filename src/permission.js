import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";

NProgress.configure({
  showSpinner: false
});

const whiteList = ['/admin/login', '/admin/auth-redirect']; // 免登录白名单

router.beforeEach(async (to, from, next) => {

  // 启动进度条
  NProgress.start();

  console.log(to)

  const TokenKey = to.meta.admin ? 'Backend-Token' : 'Token';

  // console.log(TokenKey);

  // determine whether the user has logged in
  const hasToken = getToken(TokenKey);

  if (TokenKey === 'Backend-Token') {
    // 后台路由守卫
    if (hasToken) {
      if (to.path === '/admin/login') {
        // 如果已登录，重定向到首页
        next({ path: '/admin/dashboard' })
      } else {
        // 确定用户是否通过getinfo获取了权限角色
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
          next()
        } else {
          try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const { roles } = await store.dispatch('getInfo')

            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
      NProgress.done()
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        // 否则全部重定向到登录页
        next(`/admin/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    // 前台路由守卫
    NProgress.done()
  }


});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
});