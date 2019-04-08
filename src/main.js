// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 引入qs处理字符串
import qs from 'qs'
// 引入global.css全局样式控制文件
import './assets/css/global.css'
// 引入“图标”css样式文件
import './assets/fonts/iconfont.css'
// 导入element-ui组件库并注册给vue
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// axios请求根地址
axios.defaults.baseURL = 'http://192.168.1.144/ad/audit/'

Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

// axios的请求拦截器(在其中配置token)
// axios.interceptors.request.use(
//   function(config) {
//     // config:代表axios的子级配置对象
//     var token = window.sessionStorage.getItem('token')
//     config.headers.Authorization = token
//     return config
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
