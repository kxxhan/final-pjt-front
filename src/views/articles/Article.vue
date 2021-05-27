<template>
  <div class="container-sm board">
    <h1>Review Board</h1>
    <ArticleList :articleList="articleList" :isMovieDetail='false'/>

    <router-link class='a-to-btn' :to="{ name : 'ArticleCreate' }"> 
    게시글 작성
    </router-link>
  </div>
</template>
<script>
import axios from 'axios'
import ArticleList from '@/components/articles/ArticleList.vue'

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
.board {
  margin-top: 60px;
}

.a-to-btn {
  display: block;
  margin-left: auto;
  width : 150px;
}
</style>
