import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:null,
    user:null,
    loading:true,
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token;
    },
    REMOVE_TOKEN(state){
      state.token = null;
    }
  },
  actions: {
    setToken({commit}, {token, expiresIn}) {
      this._vm.$axios.defaults.headers.common.Authorization =  'Bearer '+token;
      const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
      cookies.set('x-access-token', token, {expires: expiryTime});
      commit('SET_TOKEN', token);
    },

    // async refreshToken({dispatch}){
    //   const {token, expiresIn} = await this._vm.$axios.post('refresh-token');
    //   dispatch('setToken', {token, expiresIn});
    // },

    logout({commit}){
      delete this._vm.$axios.defaults.headers.common.Authorization;
      cookies.remove('x-access-token');
      commit('REMOVE_TOKEN');
    }
  },
  modules: {
  }
})
