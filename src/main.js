import Vue from 'vue'
import App from './App'
import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  template: '<App/>',
  components: { App }
})