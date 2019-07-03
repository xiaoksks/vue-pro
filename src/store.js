import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        isCollapse: false,
        selectedMenu:null
    },
    mutations: {
        collapse(state) {
            state.isCollapse = !state.isCollapse;
            //ie9兼容
            if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9.") {
                if(state.isCollapse){
                    document.getElementsByClassName("ant-layout")[1].style.marginLeft = "80px"
                }else{
                    document.getElementsByClassName("ant-layout")[1].style.marginLeft = "220px"
                }
            }
        },
        selectedMenu(state,menu){
            state.selectedMenu = menu
        }
    },
    strict: debug
})
