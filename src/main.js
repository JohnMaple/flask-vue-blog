import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

import i18n from "./lang";

import "./icons"; // 导入全局图标
import "./permission";

import '@/styles/index.scss'; // global css

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

console.log(process.env);
