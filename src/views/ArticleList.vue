<template>
  <div class="board">
    <h1>게시판 TEST</h1>
    <router-link :to="{ name : 'ArticleCreate' }"> 게시글 작성 </router-link>
    <div>
      <ul>
        <li v-for="article in articleList" :key="article.id">
          <h2>영화이름 : {{ article.movie }}</h2>
          <h3>글쓴이 : {{ article.user }}</h3>
          <h3>리뷰제목 : {{ article.title }}</h3>
          <h4>리뷰내용 : {{ article.content }}</h4>
          <br>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 로그인한 사용자만 글을 조회 / 생성 할 수 있으며 작성자 본인만 글을 수정 / 삭제 할 수 있다.
// 1. 라우터 링크로 들어왔을때 튕겨낸다. => 채택 
// 2. Componenet에 들어갔을 때 튕겨낸다. 

import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'ArticleList',
  data: function () {
    return {
      articleList: [],
      // articleInfo: [],
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: `${SERVER_URL}/articles`
    }).then( (res) => {
      this.articleList = res.data
      console.log(this.articleList)
    }).catch( (err) => {
      console.log(err)
    })
  }
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

<style scoped>
li {
  list-style: none;
}
</style>
