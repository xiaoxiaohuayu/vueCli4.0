import { message as Message } from 'ant-design-vue'

const state = {
    type: null,
    message: null
};

const actions = {
    error({ commit }, message) {
        commit('error', message);
    },
};

const mutations = {
    error(state, mes) {
        console.log(state, mes,'state, message')
    },
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
