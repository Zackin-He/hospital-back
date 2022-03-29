import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'
import { Button,Container,Header,Main,Aside,Menu,MenuItem,Submenu,MenuItemGroup,Table,TableColumn,
  Dialog,Form,FormItem,Input,Select,Option,Col,Cascader,Avatar,Dropdown,DropdownItem,DropdownMenu,Row,Card, Radio
  } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VCalendar,{
  componentPrefix: 'vc',
})
Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option)
Vue.use(Col);
Vue.use(Cascader);
Vue.use(Avatar)
Vue.use(Dropdown);
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Card)
Vue.use(Radio)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
