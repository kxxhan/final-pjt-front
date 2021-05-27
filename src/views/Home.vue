<template>
<div class="hero-image">
  <div class="hero-text">
    <h1 class="p-title">당신만을 위한,</h1>
    <h1 class="p-title">영화 추천 커뮤니티</h1>

    <p class="p-sub">좋아하는 영화들을 선택하고 
        취향에 맞는 추천 영화를 만나보세요!</p>

    <p class="p-sub2">추천 받은 영화에 리뷰를 남기고 많은 사람과 공유할 수 있습니다.</p>
    <button @click="signup" class="btn">SIGN UP</button>
    <p class="ready">준비가 되셨나요? 서비스를 시작하시려면 지금 Sign up을 누르세요! </p>
  </div>
</div>
</template>

<script>
export default {
    name : 'Home',
    methods: {
        signup: function () {
            this.$router.push({name : 'Signup'})
        }
    }
}
</script>
<style scoped>
body, html {
    height: 100%;
}

/* The hero image */
.hero-image {
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1594968625939-64ca5e0fa165?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fGJhY2tncm91bmQlMjBpbWFnZSUyMHBob3RvZ3JhcGhlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60') no-repeat center center/cover;

  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

/* Place text in the middle of the image */
.hero-text {
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.p-title {
    font-size: 3.5vw;
}
.p-sub {
    margin-top: 40px;
    font-size: 1.8vw;
}
.p-sub2 {
    margin-top: 25px;
    font-size: 1.8vw;
}
.ready {
    margin-top: 60px;
    font-size: 1vw;
}
.btn {
    text-align: center;
    margin-top: 60px;
    height: 50px;
    width: 200px;
    font-size: 1.3rem;
}
</style>