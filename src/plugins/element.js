import Vue from 'vue';
import {
    Table,
    TableColumn,
    Button,
    Row,
    Col,
    MessageBox,
    Message
} from 'element-ui';
import '../assets/scss/element-variables.scss'

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
