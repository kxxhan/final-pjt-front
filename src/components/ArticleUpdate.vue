<template>
<div>
  <hr>
    <h3>ArticleUpdate Component</h3>
    <h3>{{ article.movie.title }}에 대한 리뷰</h3>
    <small>글 번호 : {{ article.id }}</small>
    <!-- <h2>'{{ article.user.username }}'님의 리뷰 :  {{ article.title }}</h2> -->
    <input type="text" v-model="credentials.title" placeholder="글 제목">
    <input type="text" v-model="credentials.content" placeholder="내용">
    <!-- <small>작성일 : {{ new Date(article.created_at).toLocaleString() }} | 수정일 : {{ new Date(article.updated_at).toLocaleString() }}</small> -->
    <hr>
    <!-- <p> {{ article.content }}</p> -->
    <button @click="updateArticle">리뷰 수정</button>
    <button>리뷰 삭제</button>
    <hr>
    <p>이전글 : 모시기모시기</p>  
    <p>다음글 : 모시기모시기</p>  
  <hr>
</div>
</template>
<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'ArticleUpdate',
  data: function () {
    return {
      credentials: {
        title: '',
        content: '',
      }
    }
  },
  props: {
    update: {
      type: Boolean,
    },
    article: {
      type: Object,
    }
  },
  methods: {
    updateArticle: function () {
      if (!this.isValid()) return
      axios({
        method: 'put',
        url: `${SERVER_URL}/articles/${this.article.id}/`,
        data: this.credentials 
      }).then ( (res) => {
        console.log(res)
        // router에 push 해주려고 했으나 같은 url에 있기때문에 nono emit 이벤트를 해줘야 할 듯.
        // emit으로 update false로 바꿔주자.
        if (res.status === 200) {
          alert('수정완료')
          this.$emit('updated')
        }
      }).catch ( (err) => {
        console.log(err.response)
      })
    },
    isValid: function () {
      if (!this.credentials.title) {
        alert('제목을 입력하지 않았습니다.')
        return false
      } else if (!this.credentials.content) {
        alert('내용을 입력하지 않았습니다.')
        return false
      } 
      return true
    }
  },
  created: function () {
    console.log(this.article)
  }
}
</script>