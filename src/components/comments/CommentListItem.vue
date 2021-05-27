<template>
  <div>
    <hr>
    <p class='d-flex justify-content-start justify-content-md-start align-items-center mx-auto '>
      <b class='mx-2'>{{ comment.user.username }}</b> 
      <span class='mx-2'>{{ comment.content }}</span>
      <small class='pt-1'> ( {{ new Date(comment.updated_at).toLocaleString() }} )</small>
      <button class='btn ms-auto' @click="deleteComment" v-if="isWriter">삭제</button>
    </p>
  </div>
</template>
<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL
export default {
  name: 'CommentListItem',
  props: {
    comment: {
      type: Object
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
    deleteComment: function () {
      axios({
        method: 'delete',
        url: `${SERVER_URL}/articles/${this.$route.params.articleId}/comments/`,
        data: {
          comment_id: this.comment.id
        }
      }).then( () => {
        this.$emit('deleted')
      }).catch( (err) => {
        console.log(err.response)
      })
    }
  },
  computed: {
    isWriter: function () {
      return this.comment.user.email === this.$store.state.userData.email
    }
  }
}
</script>

<style scoped>
small {
  font-size : 0.7rem;
}

</style>
