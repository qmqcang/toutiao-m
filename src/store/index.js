import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 把数据备份到本地存储 防止刷新页面时丢失
      setItem(TOKEN_KEY, state.user)
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
