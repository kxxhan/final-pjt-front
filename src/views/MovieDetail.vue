<template>
  <div class="movie-detail">
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
      movie : {}
    }
  },
  created : async function () {
    const response = await axios({
      method : 'POST',
      url: SERVER_URL + `/movies/${this.$route.params.movieId}/`,
    }).catch((err)=>{
      console.log(err);
    })

    if (!response) return
    this.movie = response.data
  }
}
</script>

