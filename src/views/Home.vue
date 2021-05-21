<template>
  <div class="home">
    <h1>TMDB TEST</h1>
    <!-- <button @click="getResult">popular</button> -->
    <div v-for='result in results' :key='result.id'>
      <p>{{result.title}}</p>
      <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + result.poster_path" width='300px'>
    </div>
    <!-- <input type='text' v-model="query" @keyup="getResult(query)"> -->
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

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
        url: SERVER_URL + '/movies/showmovies/',
        // localStorage에 있는 jwt(jason web token)을 headers로 요청과 같이 넘겨준다.
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        }
      }).then(res => {
        // Promise로 받은 json데이터를 result에 할당
        console.log(res)
        this.results = res.data
      })
    }
  },
  // created 될 때 getResult 실행 => DB에 있는 영화 정보를 받아서 뿌린다.
  created: function () {
    this.getResult()
  },
}
</script>
