import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import store from '@/store/index.js'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next()
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component : About,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next()
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next({ name : 'Home' })
      }
      next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next({ name : 'Home' })
      }
      next()
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
