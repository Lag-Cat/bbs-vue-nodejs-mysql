// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Icon, Skeleton, List, PullRefresh, Image ,Button,Popup,NavBar
  ,Tab,Tabs,Row,Col,DropdownMenu,DropdownItem,Field,Divider,Sticky,Cell,
  Uploader,Toast } from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible/flexible'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(Icon)
Vue.use(Skeleton)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Image)
Vue.use(Button)
Vue.use(Popup)
Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Row)
Vue.use(Col)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Field)
Vue.use(Divider)
Vue.use(Sticky)
Vue.use(Cell)
Vue.use(Uploader)
Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
