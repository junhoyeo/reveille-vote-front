import Vue from 'vue'
import VTooltip from 'v-tooltip'
import axios from 'axios'
import App from './App.vue'

Vue.use(VTooltip)
Vue.prototype.$api = axios

new Vue({
  el: '#app',
  render: h => h(App)
})
