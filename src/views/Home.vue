<template>
  <div class="home">
    <h1>TMDB TEST</h1>
    <div v-for='movie in movies' :key='movie.id'>
      <router-link :to="{ path : `movie/${movie.id}` }">{{movie.title}}</router-link>
      <img :src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" width='300px'>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Home',
  data: function () {
    return {
      movies: '',
    }
  },
  methods: {
    getMovies: function () {
      axios({
        method: 'get',
        url: SERVER_URL + '/movies/showmovies/',
      }).then(res => {
        // Promise로 받은 json데이터를 result에 할당
        this.movies = res.data
      })
    }
  },
  // created 될 때 getResult 실행 => DB에 있는 영화 정보를 받아서 뿌린다.
  created: function () {
    this.getMovies()
  },
}
</script>
