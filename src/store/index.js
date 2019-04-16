import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import admin from "./modules/admin";
import user from "./modules/user";
import errorLog from './modules/errorLog'
// import permission from './modules/permission'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    // permission,
    tagsView,
    settings,
    admin,
    user
  },
  getters
});

export default store;
