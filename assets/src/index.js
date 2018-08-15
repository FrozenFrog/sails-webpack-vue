import Vue from "vue";
import VueI18n from "vue-i18n";
import VTooltip from "v-tooltip";
import VueRouter from "vue-router";
//import Vuex from 'vuex'
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./templates/App.vue";
import "animate.css/animate.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import { routes } from "./routes";
import store from "./store";
Vue.use(VueI18n);
Vue.use(VTooltip);
Vue.use(VueRouter);

axios.defaults.baseURL = "http://localhost:1337/";
if (localStorage.getItem("token"))
  axios.defaults.headers.common["token"] = localStorage.getItem("token"); //get token has save after reload page
Vue.use(VueAxios, axios);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") == null) {
      router.push({ name: "login" });
    } else next();
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (JSON.parse(localStorage.getItem("user")).isAdmin) next();
      else router.replace({ path: from.fullPath });
    } else next();
  }
  if (!to.matched.length) router.push("index");
  else next();
  M.AutoInit(); //intialize materialize
});

const i18n = new VueI18n({
  locale: "vn", // set locale
  fallbackLocale: "vn"
});

new Vue({
  el: "#root",
  router,
  store,
  i18n,
  render: h => h(App)
});
