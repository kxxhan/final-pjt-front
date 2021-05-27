import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Http404 from '@/views/Http404.vue'
import Recommend from '@/views/Recommend.vue'
import MovieDetail from '@/views/MovieDetail.vue'

import Article from '@/views/articles/Article.vue'
import ArticleCreate from '@/views/articles/ArticleCreate.vue'
import ArticleDetail from '@/views/articles/ArticleDetail.vue'

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
        if (store.state.userData.is_recommended){
          next()
        }else{
          next({ name : 'Recommend' })
        }
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
        if (store.state.userData.is_recommended){
          next()
        }else{
          next({ name : 'Recommend' })
        }
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
        if (store.state.userData.is_recommended){
          next({ name : 'Main' })
        }else{
          next()
        }
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
        if (store.state.userData.is_recommended){
          next()
        }else{
          next({ name : 'Recommend' })
        }
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/board',
    name: 'Article',
    component: Article,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        if (store.state.userData.is_recommended){
          next()
        }else{
          next({ name : 'Recommend' })
        }
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/article',
    name: 'ArticleCreate',
    component: ArticleCreate,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        if (store.state.userData.is_recommended){
          next()
        }else{
          next({ name : 'Recommend' })
        }
      }else{
        next({ name : 'Login'})
      }
    }
  },
  {
    path: '/board/:articleId',
    name: 'ArticleDetail',
    component: ArticleDetail,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        if (store.state.userData.is_recommended){
          next()
        }else{
          next({ name : 'Recommend' })
        }
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
  {
    path: '/oops',
    name: 'Http404',
    component: Http404,
    beforeEnter : function (to, from, next) {
      if (store.state.isLogin){
        next()
      }else{
        next({ name : 'Login'})
      }
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
