import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category.js'
import record from './record'
import fixer from '../fixer.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error:null
  },
  mutations: {
    setError(state,error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      return fixer
    }
  },
  getters:{
    error: s => s.error
  },
  modules: {
    auth,
    category,
    info,
    record
  }
})
