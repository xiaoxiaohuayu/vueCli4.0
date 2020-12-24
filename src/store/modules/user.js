// const { resolve, reject } = require("core-js/fn/promise");
const { loginFun } = require("../../libs/httpGather")


const user ={
    state:{
        token:'',
        name:'',
        roles:[],
        info:{},
    },
mutations:{
    Set_Token:(state,token) => {
        state.token = token
    }
},
actions:{
    login({ commit }, userinfo){
        loginFun({'account':'admin','password':'123456'}).then(response => {
            const result = response;
            console.log('1111111',response)
            sessionStorage.setItem('token', result.token);
            commit('Set_Token',result.token)
            resolve(response);
        }).catch( error => {
            reject(error)
        })
    }
}
}
