<template>
  <vue-glide v-model='active' :perView='4' :startAt='1' :rewind='true'>
    <vue-glide-slide v-for='recommend in recommends' :key='genreKey+recommend.id'>
      <router-link :to="{ path : `movie/${recommend.id}` }">
        <img class='w-100' :src="'http://image.tmdb.org/t/p/w500/' + recommend.backdrop_path" >
        <br>
        <b>{{recommend.title}}</b> 
      </router-link>
    </vue-glide-slide>
    <template slot="control">
      <div class='d-flex justify-content-between'>
      <i @click='decrease' class="fas fa-chevron-left mx-4"></i>
      <i @click='increase' class="fas fa-chevron-right mx-4"></i>
      </div>
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
      this.active  = this.active + 4
    }, 
    decrease : function () {
      this.active  = this.active - 4
    }, 
  },
  created : function () {
    this.perView = 4
  }
}
</script>
<style scoped>
  i {
    cursor : pointer;
    font-size: 2rem;

  }
  i:hover {
    transition: 0.4s;
    color : #ea5249;
  }
</style>