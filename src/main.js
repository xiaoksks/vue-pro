import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import '@/mock'
//粒子特效
import VueParticles from 'vue-particles'
//ant-design
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
//公共js
import common from './assets/js/common.js'
//引入vue-fontawesome https://github.com/FortAwesome/vue-fontawesome
import './plugins/fontawesome.js'

Vue.use(Antd)
Vue.use(VueParticles)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.common = common;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
