import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Recommend from '@/views/Recommend.vue'
import MovieDetail from '@/views/MovieDetail.vue'

import ArticleList from '@/views/ArticleList.vue'
import ArticleCreate from '@/views/ArticleCreate.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'

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
        next({ name : 'Main' })
      }
      next()
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next()
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next()
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetail',
    component : MovieDetail,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next()
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/board',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/article',
    name: 'ArticleCreate',
    component: ArticleCreate
  },
  {
    path: '/board/:articleId',
    name: 'ArticleDetail',
    component: ArticleDetail
  },

  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next({ name : 'Main' })
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
        next({ name : 'Main' })
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
