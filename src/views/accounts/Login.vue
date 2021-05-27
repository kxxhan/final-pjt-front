<template>
  <div class="container-sm signin">
    <h1>Login</h1>
    <form class="d-flex-row justify-content-center" id='login' @submit.prevent='login'>
    <div class="mb-3 row">
      <label for="email" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="email" v-model="credentials.email" placeholder="email@example.com">
      </div>
    </div>
    <div class="mb-4 row">
      <label for="password" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="credentials.password">
      </div>
    </div>
    <button class="btn mt-2" type="submit">로그인</button>
  </form>
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
      this.$store.dispatch('login', this.credentials)
    },
    isValid : function () {
      if (!this.credentials.email.trim() || !this.credentials.password.trim()) {
        alert('빈 항목이 있습니다.')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
  .signin {
    margin-top: 60px;
  }

  #login {
    margin : 50px auto;
    max-width: 500px;
  }
  h1 {
    margin : 0 auto;
  }

  /* .btn {
    background-color: #ea5249 ;
    color: #ffffff;
  } */
</style>