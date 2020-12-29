const { loginFun,logoutFun } = require("../../libs/httpGather")
import router from '../../router/index.js';
import { message } from 'ant-design-vue'

const state={};
const mutations = {
    logout(state) {
        // state.status = {};
        // state.token = null;
    },
    loginRequest(state, userinfo) {
        console.log(userinfo,'登陆之前的账号密码')
    },
    token(state, token) {
        // state.status = true ;
        state.token = token;
    },
    loginFailure(state,error) {
        console.log(error,'error')
        // sessionStorage.removeItem('token');
        // state.user = false;
    },
};
const actions = {
    login({ dispatch,commit }, {account, password}){
        commit('loginRequest',{ account, password})
        loginFun({account,password}).then(response => {
            const result = response;
            sessionStorage.setItem('token', result.token);
            commit('token',result.token)
            message.success({
                content:'登陆成功',
                duration:3,
            })
            // router.push('/').catch((e) => { 
            //     console.log('e')
            //  })
        },error=>{
            // console.log('loginFailure')
            // commit('loginFailure', error);
            dispatch('alert/error', error, { root: true });
        }).catch(()=>{
            console.log('catch')
        })
    },
    logout({ commit }){
        console.log(sessionStorage.getItem('token'),'1')
        logoutFun({}).then((response)=>{
            const result = response;
            console.log(result)
        },error => {

        }).catch(()=>{

        })
        console.log(sessionStorage.getItem('token'),'3')
        // sessionStorage.removeItem('token');
        // commit('logout');
    }
}
export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};
