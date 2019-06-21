import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
//按需导入
import { faSpinner} from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner)

Vue.component('font-awesome-icon', FontAwesomeIcon)
