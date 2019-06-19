import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import VueParticles from 'vue-particles'
// 在入口处引入模拟的假数据
import '@/mock'
// 引入完整ant-design-vue组件
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
//引入公共js
import common from './assets/js/common.js'
Vue.prototype.common = common;

Vue.use(Antd)
//引入粒子特效
Vue.use(VueParticles)
// 将axios绑定到vue原型上
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
