<template>
  <div class="board">
    <h1>게시판 TEST</h1>
    <router-link :to="{ name : 'ArticleCreate' }"> 게시글 작성 </router-link>
    <ArticleList :articleList="articleList"/>
    <!-- <ul class="list-group">
      <li class="list-group-item" v-for="article in articleList" :key="article.id">
        <b>영화이름 : {{ article.movie.title }}</b> |
        <b>글쓴이 : {{ article.user.username }}</b>
        <p>리뷰제목 :           
          <router-link :to="{ path : `/board/${article.id}` }">{{ article.title }}</router-link>
        </p>
        <b>작성 시간 : {{ new Date(article.created_at).toLocaleString() }} | 수정 시간 : {{ new Date(article.updated_at).toLocaleString() }}</b>
        <br>
      </li>
    </ul> -->
  </div>
</template>
<script>
import axios from 'axios'
import ArticleList from '@/components/ArticleList.vue'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Article',
  data: function () {
    return {
      articleList: [],
    }
  },
  components: {
    ArticleList
  },
  created: function () {
    axios({
      method: 'get',
      url: `${SERVER_URL}/articles`
    }).then((res) => {
      this.articleList = res.data
      console.log(this.articleList)
    }).catch((err) => {
      console.log(err.response)
    })
  }
}
</script>

<style scoped>
li {
  /* list-style: none; */
}
.list-group {
  color: #1f1f1f;
  background-color: #ffffff;
}
.list-group-item {
  /* border : 1px solid rgba(255, 255, 255, 0.125); */
  color: #1f1f1f;
  background-color: #ffffff;
}
</style>
