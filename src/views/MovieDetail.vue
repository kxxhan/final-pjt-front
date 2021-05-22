<template>j
  <div class="movie-detail">
    <!-- <i class="fas fa-star" v-for="i in fullStar" :key='i'></i>
    <i class="fas fa-star-half-alt" v-for=" j in halfStar" :key='j'></i>
    <i class="far fa-star" v-for="k in emptyStar" :key='k'></i> -->
    <span v-if="rating">내 점수 : {{ rating }}</span>
    <button @click='vote'>8점 주기</button>
    <h1>{{ movie.title }} </h1>
    <small>{{ movie.original_title }}</small>
    <br>
    <img :src="'http://image.tmdb.org/t/p/w500/'+ movie.poster_path " alt="">

  </div>
</template>


<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL
export default {
  name: 'MovieDetail',
  data : function () {
    return {
      movie : {},
      rating : null
    }
  },
  methods : {
    vote : function () {
      axios({
        method : 'post',
        url : SERVER_URL + `/movies/${this.$route.params.movieId}/vote`,
        data : {
          movie_id : this.$route.params.movieId,
          rating : 8
        },
      })
    }
  },
  created : async function () {
    // 영화 정보 가져오는 로직
    const response = await axios({
      method : 'POST',
      url: SERVER_URL + `/movies/${this.$route.params.movieId}/`,
    }).catch((err)=>{
      console.log(err);
    })
    console.log(response.data);
    if (!response) return
    this.movie = response.data.movie
    this.rating = response.data.rating
  },
  // computed : {
  //   fullStar : function () {
  //     return parseInt(this.rating / 2)
  //   },
  //   halfStar : function () {
  //     return this.rating % 2
  //   },
  //   emptyStar : function () {
  //     return 5-this.fullStar+this.halfStar
  //   }
  // }
}
</script>

