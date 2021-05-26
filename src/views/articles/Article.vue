<template>
  <div class="board">
    <h1>Review Board</h1>
    <ArticleList :articleList="articleList"/>

    <router-link :to="{ name : 'ArticleCreate' }"> 
      <button class='btn'>게시글 작성 </button>
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
.btn {
  display : block;
  margin-left: auto;
}


</style>
