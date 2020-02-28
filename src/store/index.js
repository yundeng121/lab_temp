import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
  isLogin: false,
  //首页tab
  indexTab: '',

  goods: null,
  platform: null,
  mallTab: null,
  orderTab: null,
}

const mutations = {
  initialiseStore(state) {
    state.token = localStorage.getItem('token')
    state.indexTab = localStorage.getItem('indexTab')
  },
  setToken(state, token) {
    state.token = token
    localStorage.token = token
  },
  setIndexTab(state, index) {
    state.indexTab = index
    localStorage.indexTab = index
  },
  setGoods(state, goodsInfo) {
    state.goods = goodsInfo.goods
    state.platform = goodsInfo.platform
  },
  setMallTab(state, tab) {
    state.mallTab = tab
  },
  setOrderTab(state,tab) {
    state.orderTab = tab
  },
  setUserInfo(state,userInfo) {
    state.userInfo = userInfo
    localStorage.userInfo = userInfo
  }
}

const getters = {
  getToken(state) {
    if (!state.token) {
      state.token = localStorage.getItem('token')
    }
    return state.token
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
