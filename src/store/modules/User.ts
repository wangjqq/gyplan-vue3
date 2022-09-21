import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {}
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    // 设置用户信息
    SET_USER: (state, flag) => {
      state.user = flag;
    }
  },
  actions: {
    setUserInfo({ commit }, flag) {
      commit('SET_USER', flag);
    }
  },
  modules: {
  }
})
