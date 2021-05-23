import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default new Vuex.Store({
  state: {
    isLogin : false,
    movies : []
  },
  mutations: {
    LOGIN : function (state) {
      state.isLogin = true
    },
    LOGOUT : function(state) {
      state.isLogin = false
    },
    SET_MOVIES : function (state, payload) {
      state.movies = payload
    }
  },
  actions: {
    login : async function (context, data) {
      // 1. axios 호출해서 로그인 처리 후 토큰 받기
      try {
        const response = await axios({
          method: 'POST',
          url: SERVER_URL + '/accounts/api-token-auth/',
          data,
        })
        context.commit('LOGIN') // 2. isLogin true로 변경하기
        // 3. 토큰을 axios 에 기본 탑재
        const token = response.data.token
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`
        return token // 4. 토큰 리턴하기
      } catch (error) {
        // axios 요청에 실패할 경우 undefined를 리턴하므로 login의 if token에 걸린다.
        console.log(error)
      }
    },
    getMovies : async function (context) {
      const response = await axios({
        method: 'get',
        url: SERVER_URL + '/movies/showmovies/',
      }).catch((err)=>{
        console.log(err);
      })
      if (!response) return false
      context.commit('SET_MOVIES', response.data)
      return true
    }
  },
  modules: {
  }
})
