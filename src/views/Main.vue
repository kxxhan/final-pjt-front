<template>
  <div class="container-sm main">
    <section v-for='genreKey in recommendsKeys' :key='genreKey'>
      <h2>🎬 {{ genreKey }} 추천 영화</h2>
      <br>
      <vue-glide>
        <vue-glide-slide v-for='recommend in recommends[genreKey]' :key='genreKey+recommend.id'>
          <router-link :to="{ path : `movie/${recommend.id}` }">
            <img class='w-100' :src="'http://image.tmdb.org/t/p/w500/' + recommend.backdrop_path" >
            <br>
            <b>{{recommend.title}}</b> 
            <br>
          </router-link>
        </vue-glide-slide>
        <template slot="control">
          <button data-glide-dir="<">prev</button>
          <button data-glide-dir=">">next</button>
        </template>
      </vue-glide>
      
      <hr>
    </section>
    <h1>TMDB TEST</h1>
    <section class='d-flex flex-row'>
      <div class='w-100' v-for='movie in movies' :key='movie.id'>
        <router-link class='w-100' :to="{ path : `movie/${movie.id}` }">
          <img class='w-100' :src="'http://image.tmdb.org/t/p/w500/' + movie.backdrop_path" >
          <p>{{movie.title}}</p> 
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
export default {
  name: 'Main',
  components : {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  methods : {
    getMovies : async function () {
      if (this.$store.state.movies.length)  return 
      const result = await this.$store.dispatch('getMovies')
      if (!result) {
      alert('영화를 서버에서 받아오지 못했습니다.')
      }
    },
    getRecommends : async function () {
      const response = await this.$store.dispatch('getRecommends')
      if (!response) {
        alert('추천 영화를 서버에서 받아오지 못했습니다.')
      }
    }
  },
  created: function () {
    this.getMovies()
    this.getRecommends()
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

<style scoped>
.main {
  margin-top: 60px;
}

</style>