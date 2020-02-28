import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

Vue.config.productionTip = false

import {Button, Field} from 'vant'

Vue.use(Button)
Vue.use(Field)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}).$mount('#app')
