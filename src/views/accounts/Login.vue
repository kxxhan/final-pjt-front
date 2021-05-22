<template>
    <div>
    <h1>Login</h1>
    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="credentials.email">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" @keyup.enter="login" v-model="credentials.password">
    </div>
    <button @click="login">로그인</button>
  </div>
</template>

<script>
export default {
  name : 'Login',
  data: function () {
    return {
      credentials: {
        email: '',
        password: '',
      }
    }
  },
  methods : {
    login : async function () {
      if (!this.isValid()) return
      const token = await this.$store.dispatch('login', this.credentials)
      if (token) {
        localStorage.setItem('jwt', token)
        this.$router.push({ name : 'Home'})
      }else{
        alert('로그인 정보를 확인해 주세요')
      }
    },
    isValid : function () {
      if (!this.credentials.email.trim() || !this.credentials.password.trim()) {
        alert('빈 항목이 있습니다.')
        return false
      }else return true
    }
  }
}
</script>

<style>

</style>