<template>
  <div id="app">
    <div id="nav">
      <span v-if="isLogin">
        <span v-if="isRecommended">
          <router-link :to="{ name : 'Main' }">Main</router-link> |
          <router-link :to="{ name : 'Article' }">Board</router-link> |
        </span>
        <router-link to="#" @click.native="logout">Logout</router-link> 
        <router-link to="#" v-if="isSuperUser" @click.native="goAdmin">| Admin</router-link> 
      </span>
      <span v-else>
        <router-link :to="{ name : 'Home' }">Home</router-link> |
        <router-link :to="{ name : 'Login' }">Login</router-link> |
        <router-link :to="{ name : 'Signup' }">Signup</router-link>
      </span>

    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    logout: async function () {
      this.$store.dispatch('logout')
    },
    goAdmin : function () {
      location.href='http://127.0.0.1:8000/admin'
    }
  },
  computed: { // 1. computed로 
    isLogin: function () { // store에 저장되어있는 isLogin 값을 사용할 수 있게 해준다.
      return this.$store.state.isLogin
    },
    isRecommended : function () {
      return this.$store.state.userData.is_recommended
    },
    isSuperUser : function () {
      return this.$store.state.userData.is_superuser
    }
  },
  created: function () {
    // console.log('app created실행');
    const jwt = localStorage.getItem('jwt')
    if (jwt) { // 토큰이 있으면 헤더에 넣어주고, isLogin도 true로 만들어 줘야 바람직하다
      this.$store.commit('LOGIN')
      axios.defaults.headers.common['Authorization'] = `JWT ${jwt}`

      this.$store.dispatch('getUserData')
    }
  }

}
</script>

<style>
#app {
  /* 구글폰트 */
  font-family: 'Noto Sans KR', sans-serif;
  /* Vue 기본 */
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
