<template>
  <div>
    <div v-if="isUpdate">
      <ArticleUpdate
        :isUpdate="isUpdate"
        :article="article"
        @updated="updateArticle"
      />
    </div>
    <div v-else>
      <h1>{{ article.movie.title }}에 대한 리뷰</h1>
      <small>글 번호 : {{ article.id }}</small>
      <h2>'{{ article.user.username }}'님의 리뷰 :  {{ article.title }}</h2>
      <small>작성일 : {{ new Date(article.created_at).toLocaleString() }} | 수정일 : {{ new Date(article.updated_at).toLocaleString() }}</small>
      <hr>
      <p> {{ article.content }}</p>
      <div v-if="isAuthor">
        <button @click="updateArticle">리뷰 수정</button>
        <button @click="deleteArticle">리뷰 삭제</button>
      </div>
      <hr>  
      <CommentList/>
      <hr>
      <p>이전글 : 모시기모시기</p>  
      <p>다음글 : 모시기모시기</p>  
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import ArticleUpdate from '@/components/articles/ArticleUpdate.vue'
import CommentList from '@/components/comments/CommentList.vue'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name : 'ArticleDetail',
  data : function () {
    return {
      isUpdate: false,
      isAuthor: false,
      article: {
        movie : {},
        user : {}
      },
    }
  },
  components: {
    ArticleUpdate,
    CommentList,
  },
  methods: {
    getArticle: function () {
      axios({
        method: 'get',
        url: `${SERVER_URL}/articles/${this.$route.params.articleId}/`
      }).then((res) => {
        this.article = res.data.article
        this.isAuthor = res.data.isAuthor
      }).catch((err) => {
        console.log(err.response)
      })
    },
    updateArticle: function () {
      if (this.isUpdate) this.getArticle()
      this.isUpdate = !this.isUpdate
    },
    deleteArticle: function () {
      axios({
        method: 'delete',
        url: `${SERVER_URL}/articles/${this.$route.params.articleId}/`
      }).then( (res) => {
        console.log(res)
        this.$router.push({ name: 'ArticleList' })
      }).catch((err) => {
        console.log(err.response)
      })
    },
  },
  created: function () {
    this.getArticle()
  }
}
</script>

<style>

</style>