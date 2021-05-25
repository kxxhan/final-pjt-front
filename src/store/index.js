import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

Vue.use(Vuex)
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default new Vuex.Store({
  state: {
    isLogin : false,
    movies : [],
    recommends : {},
  },
  mutations: {
    LOGIN : function (state) {
      state.isLogin = true
    },
    LOGOUT : function(state) {
      state.isLogin = false
      state.movies = []
      state.recommends = []
    },
    SET_MOVIES : function (state, payload) {
      state.movies = payload
    },
    SET_RECOMMENDS : function (state, payload) {
      state.recommends = payload
    }
  },
  actions: {
    login : async function (context, data) {
      // 1. axios 호출해서 로그인 처리 후 토큰 받기
      const response = await axios({
        method: 'POST',
        url: SERVER_URL + '/accounts/api-token-auth/',
        data,
      }).catch((err)=>{
        // axios 요청에 실패할 경우 undefined를 리턴하므로 login의 if token에 걸린다.
        alert('로그인 정보를 확인해 주세요\n' + err.response)
      })
      if (!response) return
      context.commit('LOGIN') // 2. isLogin true로 변경하기
      // 3. 토큰을 axios 에 기본 탑재
      const token = response.data.token
      localStorage.setItem('jwt', token)
      axios.defaults.headers.common['Authorization'] = `JWT ${token}`
      router.push({ name : 'Main' })
    },

    logout : function name(context) {
      context.commit('LOGOUT')
      localStorage.removeItem('jwt')
      axios.defaults.headers.common['Authorization'] = ''
      router.push({ name : 'Login' })
    },
    
    getMovies : async function (context) {
      const response = await axios({
        method: 'get',
        url: SERVER_URL + '/movies/showmovies/',
      }).catch((err)=>{
        console.log(err.response);
      })
      if (!response) return false
      context.commit('SET_MOVIES', response.data)
      return true
    },
    // 추천 영화 로직
    getRecommends : async function (context) {
      const response = await axios({
        method: 'get',
        url: SERVER_URL + '/movies/recommend/',
      }).catch((err)=>{
        console.log(err.response);
      })

      if (!response) return false
      context.commit('SET_RECOMMENDS', response.data)
      return true
    },

  },
})
