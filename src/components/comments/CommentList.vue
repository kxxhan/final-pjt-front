<template>
  <div>
    <p class='fs-3'>댓글</p>
    <p class='d-flex justify-content-end mb-4'>
      <input class='mx-4 w-25' type="text" v-model="commentInput.content">
      <button class='btn' @click="createComment">등록</button>
    </p>
    <CommentListItem 
    v-for="comment in commentList" :key="comment.id"
    :comment="comment"
    @deleted="getComment"
    />
    <br>
  </div>
</template>
<script>
import CommentListItem from '@/components/comments/CommentListItem.vue'
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'CommentList',
  components: {
    CommentListItem
  },
  data: function () {
    return {
      commentInput: {
        content: ''
      },
      commentList: [],
    }
  },
  methods: {
    // Comment GET
    getComment: function () {
      axios({
        method: 'get',
        url: `${SERVER_URL}/articles/${this.$route.params.articleId}/comments/`
      }).then( (res) => {
        console.log(res.data)
        this.commentList = res.data
      }).catch( (err) => {
        console.log(err.response)
      })
    },
    createComment: function () {
      axios({
        method: 'post',
        url: `${SERVER_URL}/articles/${this.$route.params.articleId}/comments/`,
        data: this.commentInput
      }).then( (res) => {
        console.log(res.data)
        if (res.status === 200) {
          this.getComment()
        }
      }).catch( (err) => {
        console.log(err.response)
      })
    }
  },
  created: function () {
    this.getComment()
  }
}
</script>