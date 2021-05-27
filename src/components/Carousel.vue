<template>
  <vue-glide :active='active'>
    <vue-glide-slide v-for='recommend in recommends' :key='genreKey+recommend.id'>
      <router-link :to="{ path : `movie/${recommend.id}` }">
        <img class='w-100' :src="'http://image.tmdb.org/t/p/w500/' + recommend.backdrop_path" >
        <br>
        <b>{{recommend.title}}</b> 
      </router-link>
    </vue-glide-slide>
    <template slot="control">
      <button  @click='decrease'>prev</button>
      <button @click='increase'>next2</button>
    </template>
  </vue-glide>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
export default {
  name : 'Carousel',
  components : {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  props : {
    recommends : {
      type : Array,
      require : true
    },
    genreKey : {
      type : String,
      required : true
    }
  },
  data : function () {
    return {
      active: 1
    }
  },
  methods : {
    increase : function () {
      this.active  = this.active + 3
    }, 
    decrease : function () {
      this.active  = this.active - 3
    }, 
  },
}
</script>

<style>

</style>