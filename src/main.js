import Vue from 'vue'
import VTooltip from 'v-tooltip'
import VueSweetalert2 from 'vue-sweetalert2';
import ripple from 'vue-ripple-effect'
import 'vue-ripple-effect/lib/index.css'
import axios from 'axios'
import App from './App.vue'

Vue.use(VTooltip)
Vue.use(VueSweetalert2)
Vue.use(ripple.install)

Vue.prototype.$api = axios.create({
  baseURL: 'http://localhost:3000/'
})

new Vue({
  el: '#app',
  render: h => h(App)
})
