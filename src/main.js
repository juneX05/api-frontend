import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router/index'
import axios from './plugins/axios';
import VueProgressBar from 'vue-progressbar'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  failedColor: "rgb(255,0,6)",
  height: "10px"
});

export default new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
