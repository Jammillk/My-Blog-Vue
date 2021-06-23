import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // properties
    token: localStorage.getItem("token"),
    // 这里是反序列化
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      // 给上面的state赋传来的token的值，就相当于bean的settter
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      // 这里存的是一次会话的用户数据
      state.userInfo = userInfo
      // 不能存对象，需要将它序列化
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      // 就是把属性全部置为空
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token", '')
      sessionStorage.setItem("userInfo", '')
    }

  },
  getters: {
    // get
    getUserInfo:state => {
      return state.userInfo;
    }
  },
  actions: {},
  modules: {}
})
