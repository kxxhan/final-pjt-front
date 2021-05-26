<template>
<div>
    <h3>ArticleUpdate</h3>
    <br>
    <h3>🎬 {{ article.movie.title }}</h3>
    <form class="row g-3 form"  @submit.prevent='updateArticle'>
      <div class="mb-3 row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="title" v-model="credentials.title" placeholder="Title">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="content" class="col-sm-2 col-form-label">Content</label>
        <div class="col-sm-10">
          <textarea type="text" class="form-control" id="content" v-model="credentials.content" placeholder="Content"></textarea>
        </div>
      </div>
      <p class='d-flex justify-content-end pe-3'>
      <button class="btn mx-2" type="button">수정하기</button>
      <button class="btn me-4" type="button">취소</button>
      </p>
    </form>

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
        title: this.article.title,
        content: this.article.content,
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

<style scoped>
#content {
  height: 300px;
}

h1, h3 {
  margin : 10px auto;
}

.form {
  margin : 50px auto;
}
</style>