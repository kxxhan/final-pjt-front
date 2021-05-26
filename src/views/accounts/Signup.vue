<template>
  <div >
    <h1>Signup</h1>
    <form class="row g-3" id='signup' @submit.prevent='signup'>
    <div class="mb-3 row">
      <label for="email" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="email" v-model="credentials.email" placeholder="email@example.com">
        <span v-if="invalidMessage.email">{{ invalidMessage.email }}</span>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="username" class="col-sm-2 col-form-label">Username</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="username" v-model="credentials.username" placeholder="username">
        <span v-if="invalidMessage.username">{{ invalidMessage.username }}</span>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="password" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="password" v-model="credentials.password">
        <span v-if="invalidMessage.password">{{ invalidMessage.password }} </span>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="password-confirm" class="col-sm-2 col-form-label">Password Confirm</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="password-confirm" v-model="credentials.passwordConfirm">
        <span v-if="invalidMessage.passwordConfirm">{{ invalidMessage.passwordConfirm }} </span>
      </div>
    </div>
    <button class="btn" type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
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
      },
      invalidMessage : {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
      }
    }
  },
  methods: {
    signup: async function () {
      // 1. 아이디, 이메일, 비밀번호가 빈칸이면 alert 후 리턴
      if (! this.isValid()) return 

      // 2. 통과시 
      const response = await axios({
        method: 'POST',
        url: SERVER_URL + '/accounts/signup/',
        data: this.credentials,
      }).catch(err => {
        const data = err.response.data
        for (const key in data) {
          this.invalidMessage[key] = data[key][0]
        }
      })
      if (!response) return

      // 3. 회원 가입 성공 시 로그인 진행
      const credentials = {
        email : this.credentials.email,
        password : this.credentials.password,
      }
      this.$store.dispatch('login', credentials)
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
}
</script>

<style scoped>
  span {
    color : crimson;
    font-size: 0.8rem;
  }
  #signup {
    margin : 50px auto;
    max-width: 500px;
  }
  h1 {
    margin : 0 auto;
  }
</style>
