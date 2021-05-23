<template>
  <div class="board">
    <h1>게시판 TEST</h1>
    <router-link :to="{ name : 'Article' }"> 게시글 작성 </router-link>
  </div>
</template>
<script>
// 로그인한 사용자만 글을 조회 / 생성 하 수 있으며 작성자 본인만 글을 수정 / 삭제 할 수 있다.
// 1. 라우터 링크로 들어왔을때 튕견낸다. => 채택 
// 2. Componenet에 들어갔을 때 튕겨낸다. 

// import axios from 'axios'

export default {
  name: 'Board',
  data: function () {
    return {}
  },
  // components: {
  //   Article
  // }
  // methods: {
  //   createArticle: function () {
  //     axios({
  //       methods: 'post',
  //       //url: 
  //     })
  //   }
  // }
}
</script>

