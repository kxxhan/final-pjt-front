<template>
  <div class="home">
    <h1>TMDB TEST</h1>
    <!-- <button @click="getResult">popular</button> -->
    <div v-for='result in results' :key='result.id'>
      <p>{{result.title}}</p>
      <img v-bind:src="'http://image.tmdb.org/t/p/w500/' +    result.poster_path" width='300px'>
    </div>
    <!-- <input type='text' v-model="query" @keyup="getResult(query)"> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: function () {
    return {
      // query:  '',
      results: '',
    }
  },
  methods: {
    getResult: function () {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=3ba0ab6eaf6d388c9d40f9c95a9fcdf1&language=ko-KR&page=1'
      }).then(res => {
        console.log(res)
        this.results = res.data.results
      })
    }
  },
  created: function () {
    this.getResult()
  },
}
</script>
