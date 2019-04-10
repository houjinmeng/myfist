import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Account from '@/components/Account'
import User from '@/components/User'
import Check from '@/components/Check'
import Machine from '@/components/Machine'
import Price from '@/components/Price'
import Order from '@/components/Order'
import Statistics from '@/components/Statistics'
import Marketing from '@/components/Marketing'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/account', component: Account },
        { path: '/user', component: User },
        { path: '/check', component: Check },
        { path: '/machine', component: Machine },
        { path: '/price', component: Price },
        { path: '/order', component: Order },
        { path: '/statistics', component: Statistics },
        { path: '/marketing', component: Marketing }
      ]
    }
  ]
})

// 给路由设置“导航守卫”
// 在守卫中对token进行监听，有token就让执行，否则跳转到登录页去
router.beforeEach((to, from, next) => {
  // 请求"login"就直接通过
  if (to.path === '/login') {
    return next()
  }
  // 请求"非login"，就判断token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }

  next() // 请继续你的旅行
})
export default router
