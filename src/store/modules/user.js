const { loginFun } = require("../../libs/httpGather")
import router from '../../router/index.js';

const state={};
const mutations = {
    logout(state) {
        // state.status = {};
        state.token = null;
    },
    loginRequest(state, userinfo) {
        console.log(userinfo,'登陆之前的账号密码')
    },
    _token(state, token) {
        // state.status = true ;
        state.token = token;
    },
    loginFailure(state,error) {
        console.log(error,'error')
        sessionStorage.removeItem('token');
        state.user = false;
    },
};
const actions = {
    login({ dispatch,commit }, {username,password}){
        // login({ commit }, {username,password}){
            // console.log(dispatch)
        commit('loginRequest',{ username, password})
        let obj ={
        'account':username,'password':password
        }
        loginFun(obj).then(response => {
            const result = response;
            sessionStorage.setItem('token', result.token);
            commit('_token',result.token)
            console.log(router,'router')
            router.push('/home').catch((e) => { 
                console.log('e')
             })
        },error=>{
            // console.log('loginFailure')
            commit('loginFailure', error);
            // dispatch('alert/error', error, { root: true });
        }).catch(()=>{
            console.log('catch')
        })
    },
    logout({ commit }){
        sessionStorage.removeItem('token');
        commit('logout');
    }
}
export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};
