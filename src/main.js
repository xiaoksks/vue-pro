import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import axios from 'axios'
import 'vue-cookies'
import '@/mock'
//公共js
import common from './assets/js/common.js'
//引入vue-fontawesome https://github.com/FortAwesome/vue-fontawesome
import './plugins/fontawesome.js'
//引入ant-design
import './plugins/antd.js'
//引入element-ui
import './plugins/element.js'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.common = common;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
