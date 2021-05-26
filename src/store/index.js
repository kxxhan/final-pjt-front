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
    recommends : [],
    userData : {
      username: null,
      email : null,
      is_recommended : null,
    }
  },
  mutations: {
    LOGIN : function (state) {
      state.isLogin = true
    },
    LOGOUT : function(state) {
      state.isLogin = false
      state.movies = []
      state.recommends = []
      state.userData = {
        username: null,
        email : null,
        is_recommended : null,
        is_superuser : null,
      }
    },
    SET_MOVIES : function (state, payload) {
      state.movies = payload
    },
    SET_RECOMMENDS : function (state, payload) {
      state.recommends = payload
    },
    SET_USERDATA : function (state, payload) {
      state.userData = payload
    },
    SET_IS_RECOMMENDED : function (state) {
      state.userData.is_recommended = true
      console.log(state.userData.is_recommended);
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
        console.log(err.response)
      })
      if (!response) return
      context.commit('LOGIN') // 2. isLogin true로 변경하기
      // 3. 토큰을 axios 에 기본 탑재
      const token = response.data.token
      localStorage.setItem('jwt', token)
      axios.defaults.headers.common['Authorization'] = `JWT ${token}`
      // 로그인 시 유저데이터 가져오는 부분
      this.dispatch('getUserData')
    },

    logout : function(context) {
      context.commit('LOGOUT')
      localStorage.removeItem('jwt')
      axios.defaults.headers.common['Authorization'] = ''
      router.push({ name : 'Login' })
    },

    getUserData : async function (context) {
      // 토큰을 넣었으므로 요청을 보내서 유저 정보를 받아온다
      const response = await axios({
        method: 'GET',
        url: SERVER_URL + '/accounts/userinfo/',
      }).catch((err)=>{
        console.log(err.response);
      })

      if (response) {
        const userData = response.data
        console.log(userData);
        context.commit('SET_USERDATA', userData)
        if (userData.is_recommended) {
          if (location.pathname !== '/main') {
            router.push({ name : 'Main' })
          }
        }else{
          router.push({ name : 'Recommend' })
        }
      }else{
        this.dispatch('logout')
      }
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
