<template>
  <div>
    <p>{{ comment.content }}</p>
  </div>
</template>
<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object
    }
  },
  data: function () {
    return {
      
    }
  }
}
</script>