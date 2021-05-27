<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Moview</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- id navbarNav => nav로 변경 -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <span class="navbar-nav" v-if="isLogin">
            <span class="navbar-nav" v-if="isRecommended">
              <router-link class="nav-item nav-link" id="r-link" :to="{ name : 'Main' }">Main</router-link>
              <router-link class="nav-item nav-link" id="r-link" :to="{ name : 'Article' }">Board</router-link>
            </span>
            <router-link class="nav-item nav-link" id="r-link" to="#" @click.native="logout">Logout</router-link>
            <router-link class="nav-item nav-link" id="r-link" to="#" v-if="isSuperUser" @click.native="goAdmin">Admin</router-link> 
          </span>
          <span class="navbar-nav" v-else>
            <router-link class="nav-item nav-link" id="r-link" :to="{ name : 'Home' }">Home</router-link>
            <router-link class="nav-item nav-link" id="r-link" :to="{ name : 'Login' }">Login</router-link>
            <router-link class="nav-item nav-link" id="r-link" :to="{ name : 'Signup' }">Signup</router-link>
          </span>
        </div>
      </div>
    </nav>
    <div class="container-sm">
      <router-view/>
    </div>
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



html, body{
  height : 100%;
}

body {
  /* background-color: black; */
}

#app {
  /* 구글폰트 */
  font-family: 'Noto Sans KR', sans-serif;
  /* Vue 기본 */
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1f1f1f;
  background-color: #ffffff;
  min-height : 100%;
}

#nav {
  padding: 30px;
}
/* 건 수정 부분 */
#navbarNav .nav-item:hover{
  transition: 0.25s;
  /* color: #ea5249 ; */
}

#navbarNav .router-link-exact-active {
  /* color: #ea5249; */
}

/* navbar 배경색 */
.bg-light {
  background-color: #1f1f1f!important;
}
.navbar-brand {
  color: #ffffff !important;
}

#r-link {
  color: #ffffff !important;
}

.container-sm {
  /* margin-top: 50px; */
  margin-top : 80px;
}
/* 건 수정 부분 끝*/
#nav a {
  font-weight: bold;
  color: #1f1f1f;
}

#nav a:hover, a:hover  {
  transition: 0.25s;
  color: #ea5249 ;
}

#nav a.router-link-exact-active {
  color: #ea5249;
}

a {
  text-decoration: none;
  color : #1f1f1f;
}

.btn {
  background-color: #ea5249 ;
  color: #ffffff;
}

.a-to-btn {
  background-color: #ea5249 ;
  color: #ffffff !important;
  display: inline-block;
  font-weight: 400 !important;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  border-radius: .25rem;
}

.btn:hover, .a-to-btn:hover {
  background-color: #ffffff;
  color: #ea5249 !important;
  border : 1px solid #ea5249;
}
</style>
    