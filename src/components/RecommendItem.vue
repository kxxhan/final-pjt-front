<template>
  <div v-if="show">
    <div class="card bg-dark text-white" height='400px'>
      <img @click="onClick" :src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" height='400px'>
    </div>
  </div>

</template>

<script>
export default {
  name : 'RecommendItem',
  props : {
    movie : {
      type : Object,
      required : true
    }
  },
  data : function () {
    return {
      isMouseOn : false,
      show : true,
    }
  },
  methods : {
    onClick : function () {
      this.$emit('picked', this.movie.id)
      this.show = false
    },
  }
}
</script>

<style scoped>
  .star-wrapper {
    position: absolute;
  }
  .star {
    position: relative;
    top: -50px;
    margin : auto 0;
    color: crimson;
  }
  .card {
    margin : 10px 10px;
    border : 0;
    border-radius : 2px
  }

  img {
    border-radius : 3px
  }
</style>