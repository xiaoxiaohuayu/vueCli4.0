import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './gettes'
import { loginFun } from '@/libs/httpGather'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  mutations: {
    setLogin(state,data){
      console.log(state,data)
      loginFun(data).then((res)=>{
        state.userInfo = res;
        // sessionStorage.setItem('token', result.token);
      }).catch((error)=>{
        
      })
    }
  },
  actions: {
    setLogin(ctx,data){
      console.log(data,'data')
      ctx.commit('setLogin',data)
    }
  },
  modules: {
    user
  },
  getters
})
