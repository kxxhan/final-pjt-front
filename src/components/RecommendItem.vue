<template>
  <div v-if="show">
    
    <div class="card bg-dark text-white "  height='400px'>
      <img :src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" height='400px'>
    </div>
      <star-rating :increment="0.5" v-model='rating' @click.native='onClick'></star-rating>
  </div>

</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  name : 'RecommendItem',
  components : {
    StarRating,
  },
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
      rating: 0,
      currentRating: "No Rating",
      currentSelectedRating: "No Current Rating",
      boundRating: 3,
    }
  },
  methods : {
    // onClick : function () {
    //   this.$emit('picked', this.movie.id)
    //   this.show = false
    // },
    onClick : function () {
      this.$emit('picked', {movieId : this.movie.id, rating : parseInt(this.rating*2)})
      this.show = false
    },
    setRating: function(rating) {
      this.rating = "You have Selected: " + rating + " stars";
    },
    showCurrentRating: function(rating) {
      this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
    },
    setCurrentSelectedRating: function(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
    }
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

  .vue-star-rating {
    color : white;
    margin: 0 12%;
    margin-bottom : 50px;
  }
</style>