<template>
  <div v-if="show">
    <!-- @mouseover="onMovie" @mouseout="offMovie" @mousemove="onMove" -->
    <img @click="onClick" :src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" width='300px'>
    <!-- <div class="star-wrapper">
      <div class="star" v-show="isMouseOn">
        마우스가 올라와 있어요
      </div>
    </div> -->
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
      // this.movieList.push()
    },
    // onMovie : function () {
    //   console.log("마우스온");
    //   this.isMouseOn = true
    // },
    // offMovie : function () {
    //   console.log("마우스오프");
    //   this.isMouseOn = false
    // },
    // onMove : function () {
    //   // console.log("마우스무브");
    // },

  }
}
</script>

<style scoped>
  .star-wrapper {
    position: absolute;
  }
  .star {
    position: relative;
    /* overflow: hidden; */
    top: -50px;
    margin : auto 0;
    color: crimson;
    /* margin-bottom : -45px; */
  }
</style>