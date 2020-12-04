import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.GLOBAL={}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
