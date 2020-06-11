// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Icon, Skeleton, List, PullRefresh, Image ,Button,Popup,NavBar
  ,Tab,Tabs,Row,Col,DropdownMenu,DropdownItem,Field,Divider,Sticky,Cell,CellGroup,
  Uploader,Toast,Tag,ImagePreview,Search,RadioGroup,Radio,ActionSheet  } from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible/flexible'
import 'vant/lib/icon/local.css';
import './style/index.scss';

import commFrame from './components/frame/commFrame/index.js'

import store from './store/index.js'

import * as custFilters from './filters/index.js'

import glob from './util/glob.js'

Vue.prototype["$global"]=glob;//原型链中加入全局方法

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
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Toast)
Vue.use(Tag)
Vue.use(ImagePreview)
Vue.use(commFrame)
Vue.use(Search)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(ActionSheet)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Object.keys(custFilters).forEach(key=>{
  Vue.filter(key,custFilters[key]);
})