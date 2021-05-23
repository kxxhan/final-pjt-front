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
export default {
  name: 'Home',
  created: async function () {
    if (this.$store.state.movies.length)  return 
    const result = await this.$store.dispatch('getMovies')
    if (!result) {
      alert('영화를 서버에서 받아오지 못했습니다.')
    }
  },
  computed : {
    movies : function () {
      return this.$store.state.movies
    }
  }
}
</script>
