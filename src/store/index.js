import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    replyShow: false,
    comment: {} // 当前所点击回复的用户评论信息
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 把数据备份到本地存储 防止刷新页面时丢失
      setItem(TOKEN_KEY, state.user)
    },

    setReplyShow (state, data) {
      // if (typeof (data[1]) !== 'undefined') {
      //   state.comment = data[1]
      // }
      if (arguments[1].length !== 1) {
        state.comment = data[1]
      }
      state.replyShow = data[0]
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
