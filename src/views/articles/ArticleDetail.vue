<template>
  <div>
    <ArticleUpdate
    v-if="isUpdate"
      :isUpdate="isUpdate"
      :article="article"
      @updated="updateArticle"
      @undo-update="undoUpdate"
    />
    <div v-else>
      <ArticleContent :article='article'/>
      <p v-if="isAuthor" class="d-flex justify-content-end pe-3">
        <button class='btn' @click="updateArticle">리뷰 수정</button>
        <button class='btn' @click="deleteArticle">리뷰 삭제</button>
      </p>
      <hr>
      <CommentList/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleUpdate from '@/components/articles/ArticleUpdate.vue'
import ArticleContent from '@/components/articles/ArticleContent.vue'
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
    ArticleContent,
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
    undoUpdate : function () {
      this.isUpdate = false
    },
    deleteArticle: function () {
      axios({
        method: 'delete',
        url: `${SERVER_URL}/articles/${this.$route.params.articleId}/`
      }).then( (res) => {
        console.log(res)
        this.$router.push({ name: 'Article' })
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

<style scoped>
.btn {
  margin: 0 3px;
}
</style>