import Vue from "vue";
import VueI18n from "vue-i18n";
import VTooltip from "v-tooltip";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./templates/index.vue";
import "animate.css/animate.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import { routes } from "./routes";
Vue.use(VueI18n);
Vue.use(VTooltip);
Vue.use(VueRouter);
axios.defaults.baseURL = "http://localhost:1337/";
Vue.use(VueAxios, axios);

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('user') == null) {
        router.go({name: 'login'})
      } 
      else next()
    }
    if (!to.matched.length) router.go('Index')
    else next()
})

const i18n = new VueI18n({
  locale: "vn", // set locale
  fallbackLocale: "vn"
});

new Vue({
  el: "#root",
  router,
  i18n,
  render: h => h(App)
});
