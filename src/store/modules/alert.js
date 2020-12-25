const state = {
    type: null,
    message: null
};

const actions = {
    error({ commit }, message) {
        commit('error', message = '登陆失败');
    },
};

const mutations = {
    error(state, message) {
        state.message = message;
    },
};

export const alert = {
    state,
    actions,
    mutations
};
