<template>
  <div class="container-sm main">
    <section v-for='genreKey in recommendsKeys' :key='genreKey'>
      <h2 class='genre-title'>🎬 {{ genreKey }} 추천 영화</h2>
      <Carousel :recommends='recommends[genreKey]' :genreKey='genreKey'/>
      <hr>
    </section>
    <h2 class='genre-title'>🎬 All Movies</h2>
    <Carousel :recommends='movies' :genreKey='"all"'/>
    <!-- <section>
      <vue-glide>
      <vue-glide-slide v-for='movie in movies' :key='movie.id'>
        <router-link :to="{ path : `movie/${movie.id}` }">
          <img class='w-100' :src="'http://image.tmdb.org/t/p/w500/' + movie.backdrop_path" >
          <br>
          <b>{{movie.title}}</b> 
          <br>
        </router-link>
      </vue-glide-slide>
      <template slot="control">
        <button data-glide-dir="<">prev</button>
        <button data-glide-dir=">">next</button>
      </template>
    </vue-glide>
    </section>
    -->
  </div>
</template>

<script>
// import { Glide, GlideSlide } from 'vue-glide-js'
import Carousel from '@/components/Carousel'
export default {
  name: 'Main',
  components : {
    // [Glide.name]: Glide,
    // [GlideSlide.name]: GlideSlide,
    Carousel,
  },
  // data : function () {
  //   return {
  //     active: 1
  //   }
  // },
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
    },
    increase : function () {
      this.active += 2
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

.genre-title {
  text-align: start;
  padding: 5px 0;
}
</style>