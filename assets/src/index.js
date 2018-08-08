import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VTooltip from 'v-tooltip'
import VueRouter from 'vue-router'
import App from './templates/index.vue'
import 'animate.css/animate.min.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import {routes} from './routes'
Vue.use(VueI18n)
Vue.use(VTooltip)
Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

const i18n = new VueI18n({
    locale: 'vn', // set locale
    fallbackLocale: 'vn'
})

new Vue({
    el: '#root',
    router,
    i18n,
    render: h => h(App)
})