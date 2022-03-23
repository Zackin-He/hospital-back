import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    user_info(state,data){
      state.userInfo = data
    },
    log_out(state){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
