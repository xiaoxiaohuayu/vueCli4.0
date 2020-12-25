import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './modules/user'
import { alert } from './modules/alert'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    alert
  },
})
