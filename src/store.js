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
            state.isCollapse = !state.isCollapse
        },
        selectedMenu(state,menu){
            state.selectedMenu = menu
        }
    },
    strict: debug
})
