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
        <button>리뷰 삭제</button>
      </div>
      <hr>
      <p>이전글 : 모시기모시기</p>  
      <p>다음글 : 모시기모시기</p>  
    </div>
    </div>

    <!-- 유저가 일치하는지 여부가 중요할 것 같다. -->
    <!-- 작성자 본인만 수정, 삭제 할 수 있다. -->
</template>

<script>
import axios from 'axios'
import ArticleUpdate from '@/components/ArticleUpdate.vue'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name : 'ArticleDetail',
  data : function () {
    return {
      isUpdate: false,
      isAuthor: false,
       article: {
        // 아래 부분 없을때 TypeError가 발생하는 이유는? 렌더링은 잘 됨.
        movie : {},
        user : {}
      },
    }
  },
  components: {
    ArticleUpdate
  },
  methods: {
    getArticle: function () {
      axios({
        method: 'get',
        url: `${SERVER_URL}/articles/${this.$route.params.articleId}/`
      }).then( (res) => {
        this.article = res.data.article
        this.isAuthor = res.data.isAuthor
      }).catch( (err) => {
        console.log(err)
      })
    },
    // Article 수정
    updateArticle: function () {
      // 바꾸고 나서 바로 보여질 수 있게?
      if (this.isUpdate) {
        this.getArticle()
      }
      this.isUpdate = !this.isUpdate
    }
  },
  created: function () {
    // console.log(this.$route.params)
    this.getArticle()
  }
}
</script>

<style>

</style>