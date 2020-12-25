const { loginFun } = require("../../libs/httpGather")
const state={};
const mutations = {
    logout(state) {
        state.status = {};
        state.token = null;
    },
    loginRequest(state, userinfo) {
        console.log(userinfo,'登陆之前的账号密码')
    },
    _token(state, token) {
        state.status = true ;
        state.token = token;
    },
};
const actions = {
    // login({ dispatch,commit }, {username,password}){
        login({ commit }, {username,password}){
        commit('loginRequest',{ username, password})
        loginFun({'account':'admin','password':'123456'}).then(response => {
            const result = response;
            console.log('response',response)
            // sessionStorage.setItem('token', result.token);
            commit('_token',result.token)
        }).catch( error => {
            // dispatch('alert/error', error, { root: true });
            reject(error)
        })
    },
    logout({ commit }){
        sessionStorage.removeItem('token');
        commit('logout');
    }
}
export const user = {
    state,
    actions,
    mutations
};
