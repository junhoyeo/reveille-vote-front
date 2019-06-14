import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VueSweetalert2 from 'vue-sweetalert2';
import ripple from 'vue-ripple-effect';
import VueSession from 'vue-session';
import axios from 'axios';

import App from './App.vue';
import routes from './router'

import 'vue-ripple-effect/lib/index.css';
import './styles/base.scss'

Vue.use(VTooltip);
Vue.use(VueSweetalert2);
Vue.use(ripple.install);
Vue.use(VueSession);

const moment = require('moment')
require('moment/locale/ko')
Vue.use(require('vue-moment'), {
  moment
})

Vue.prototype.$api = axios.create({
  baseURL: 'http://localhost/',
});

new Vue({
  el: '#app',
  router: routes,
  render: h => h(App)
}).$mount('#app')
