import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const state = {
  loggedin: false //Mặc định là false, như nếu navbar component check có localStorage.getItem('user') != null thì sẽ là true
}
export default new Vuex.Store({
    state,
    mutations: {
        signined (state) {
            state.loggedin = true
        },
        signout (state) {
            state.loggedin = false
        }
    }
})