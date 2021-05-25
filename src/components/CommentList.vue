<template>
  <div>
    <small>댓글</small>
    <CommentItem 
    v-for="comment in commentList" :key="comment.id"
    :comment="comment"
    />
    <input type="text" v-model="commentInput.content">
    <button @click="createComment">등록</button>
  </div>
</template>
<script>
import CommentItem from '@/components/CommentItem.vue'
const SERVER_URL = process.env.VUE_APP_SERVER_URL
import axios from 'axios'

export default {
  name: 'CommentList',
  components: {
    CommentItem
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
      }).catch( (err) => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getComment()
  }
}
</script>