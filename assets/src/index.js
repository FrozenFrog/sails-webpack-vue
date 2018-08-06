import Vue from 'vue'
import App from './templates/index.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

new Vue({
    el: '#root',
    render: h => h(App)
})