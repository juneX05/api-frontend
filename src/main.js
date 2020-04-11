import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router/index'
import axios from './plugins/axios';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
loadProgressBar();

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
