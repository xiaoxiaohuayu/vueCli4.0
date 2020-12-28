import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './modules/user'
import { alert } from './modules/alert'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
Vue.use(Vuex)

export const store = new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    user,
    alert
  },
  plugins: [vuexLocal.plugin]
})
