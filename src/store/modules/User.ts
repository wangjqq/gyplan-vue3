import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 11
  },
  getters: {
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {

  },
  modules: {
  }
})
