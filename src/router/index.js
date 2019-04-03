import Vue from "vue";
import Router from "vue-router";
import backend from "./backend";  // 后台路由表
import frontend from "./frontend";  // 前台路由表
import Home from "@/views/Home.vue";


Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    },
    backend,
    frontend,
  ]
});

export default router;
