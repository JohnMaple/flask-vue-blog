import Vue from "vue";
import Router from "vue-router";
import { backend } from "./backend"; // 后台路由表
import frontend from "./frontend"; // 前台路由表
import Home from "@/views/Home.vue";


Vue.use(Router);

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
      roles: ['admin','editor']   will control the page roles (you can set multiple roles)
      title: 'title'              the name show in sub-menu and breadcrumb (recommend set)
      icon: 'svg-name'            the icon show in the sidebar
      noCache: true               if true, the page will no be cached(default is false)
      breadcrumb: false           if false, the item will hidden in breadcrumb(default is true)
      affix: true                 if true, the tab will affix in the tags-view
      admin: false                if true, the route is backend
    }
 */

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: "/",
    name: "home",
    component: Home
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import( /* webpackChunkName: "about" */ "@/views/About.vue")
  // },
  ...backend,
  ...frontend,
  ],
  scrollBehavior: () => ({ y: 0 }),   // 页面切换滚动行为
});

export function resetRouter() {
  const newRouter = router;
  router.matcher = newRouter.matche;  // reset router
}

export default router;