import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import Board from '@/views/Board.vue'
import Article from '@/views/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter : function (to, from, next) {
    //   console.log(to);
    //   console.log(from);
    //   console.log(next);
    // }
  },
  {
    path: '/board',
    name: 'Board',
    component: Board
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
