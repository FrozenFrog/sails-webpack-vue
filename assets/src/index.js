import Vue from 'vue'
import App from './templates/index.vue'
import 'animate.css/animate.min.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import VueI18n from 'vue-i18n'
import VTooltip from 'v-tooltip'
import VueModalTor from 'vue-modaltor'
Vue.use(VueModalTor)
Vue.use(VueI18n)
Vue.use(VTooltip)
const i18n = new VueI18n({
    locale: 'vn', // set locale
    fallbackLocale: 'vn'
})

new Vue({
    el: '#root',
    i18n,
    render: h => h(App)
})