<template>
  <div class="home">
    {{recommendsKeys}}
    <section v-for='genreKey in recommendsKeys' :key='genreKey'>
      <h2>{{ genreKey }}</h2>
      <div v-for='recommend in recommends[genreKey]' :key='genreKey+recommend.id'>
        <router-link :to="{ path : `movie/${recommend.id}` }">
          <img :src="'http://image.tmdb.org/t/p/w500/' + recommend.poster_path" width='300px'>
          <p>{{recommend.title}}</p> 
        </router-link>
      </div>
    </section>

    
    <h1>TMDB TEST</h1>
    <div v-for='movie in movies' :key='movie.id'>
      <router-link :to="{ path : `movie/${movie.id}` }">
        <img :src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" width='300px'>
        <p>{{movie.title}}</p> 
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created: async function () {
    if (this.$store.state.movies.length)  return 
    const result = this.$store.dispatch('getMovies')
      const response = this.$store.dispatch('getRecommends')
    await result
    await response
    if (!result) {
      alert('영화를 서버에서 받아오지 못했습니다.')
    }
    if (!response) {
      alert('추천 영화를 서버에서 받아오지 못했습니다.')
    }
  },
  computed : {
    movies : function () {
      return this.$store.state.movies
    },
    recommends : function () {
      return this.$store.state.recommends
    },
    recommendsKeys : function () {
      return Object.keys(this.$store.state.recommends)
    }
  }
}
</script>
