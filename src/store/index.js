import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import admin from "./modules/admin";
import user from "./modules/user";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    admin,
    user
  },
  getters
});

export default store;
