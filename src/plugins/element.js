import Vue from 'vue';
import {
    Table,
    TableColumn,
    Button,
    MessageBox
} from 'element-ui';
import '../assets/scss/element-variables.scss'

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);

Vue.prototype.$confirm = MessageBox.confirm;
