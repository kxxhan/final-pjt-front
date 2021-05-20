<template>
  <div>
    <h1>Signup</h1>
    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="credentials.email">
    </div>
    <div>
      <label for="username">사용자 이름: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="credentials.password">
    </div>
    <div>
      <label for="passwordConfirm">비밀번호 확인: </label>
      <input type="password" id="passwordConfirm" v-model="credentials.passwordConfirm"> 
    </div>
    <button @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'

// 환경변수에 수정이 일어났기 때문에 서버 껏다 켜야 함
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
      }
    }
  },
  methods: {
    signup: function () {
      // 1. 아이디, 이메일, 비밀번호가 빈칸이면 alert 후 리턴
      if (this.isValid()) {
        // 2. 통과시 
        axios({
          method: 'POST',
          url: SERVER_URL + '/accounts/signup/',
          data: this.credentials,
        }).then(async () => {
          const credentials = {
            email : this.credentials.email,
            password : this.credentials.password,
          }
          const token = await this.$store.dispatch('login', credentials)
          if (token) {
            localStorage.setItem('jwt', token)
            console.log(this.$store.state.isLogin);
          }else{
            alert('로그인 정보를 확인해 주세요')
          }
        }).catch(err => {
          console.log(err)
        })



      }
      
    },
    isValid : function () {
      if (!this.credentials.email.trim() || !this.credentials.username.trim() || !this.credentials.password.trim()) {
        alert('빈 항목이 있습니다.')
        return false
      }else if (this.credentials.password != this.credentials.passwordConfirm) {
        alert('비밀번호 확인이 일치하지 않습니다.')
        return false
      }else{
        return true
      }
    }
  },
  // created: function () {
  //   if (this.isLogin) {
  //     this.$router.push({ name: 'TodoList' })
  //   }
  // }
}
</script>
