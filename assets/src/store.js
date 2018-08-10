import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
const state = {
  loggedin: false
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