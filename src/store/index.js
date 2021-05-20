import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default new Vuex.Store({
  state: {
    isLogin : false
  },
  mutations: {
    LOGIN : function (state) {
      state.isLogin = true
    },
    LOGOUT : function(state) {
      state.isLogin = false
    },
  },
  actions: {
    login : async function (context, data) {
      // 2. axios ] 호출해서 로그인 처리 후 토큰 받기
      try {
        const response = await axios({
          method: 'POST',
          url: SERVER_URL + '/accounts/api-token-auth/',
          data,
        })
        context.commit('LOGIN') // 3. isLogin true로 변경하기
        return response.data.token // 4. 토큰 리턴하기
      } catch (error) {
        // axios 요청에 실패할 경우 undefined를 리턴하므로 login의 if token에 걸린다.
        console.log(error)
      }
    },
    logout : function (context) {
      context.commit('LOGOUT')
    }
  },
  // getters: { // 타 vue에서 isLogin status를 가져오기 위해서 getters 작성.
  //   loginStatus: function (state) {
  //     return state.isLogin
  //   }
  // },
  modules: {
  }
})
