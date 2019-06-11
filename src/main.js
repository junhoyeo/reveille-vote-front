import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VueSweetalert2 from 'vue-sweetalert2';
import ripple from 'vue-ripple-effect';
import VueSession from 'vue-session';
import axios from 'axios';
import App from './App.vue';

import 'vue-ripple-effect/lib/index.css';

Vue.use(VTooltip);
Vue.use(VueSweetalert2);
Vue.use(ripple.install);
Vue.use(VueSession);

Vue.prototype.$api = axios.create({
  baseURL: 'http://localhost:3000/',
});

new Vue({
  el: '#app',
  render: h => h(App),
});
