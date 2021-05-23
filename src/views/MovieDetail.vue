<template>
  <div class="movie-detail">
    <!-- https://gist.github.com/Enjoywater/c6f78ab957e9f5acf3b8b6e518447326 -->
    <p v-if="rating">
      내 평점  <span v-for='i in rating' :key='i'>⭐</span>
    </p>
    <p v-else>
      이 영화를 평가해주세요⭐
    </p>
    <!-- 삭제 로직은 rating이 있을 때만 보내야함 -->
    <button v-if='rating' @click='deleteRating'>평점 지우기</button>
    <!-- 여기에 평가하기 로직 구현 : 평가가 있던 없던 상관 없음 -->
    <p>
      <select v-model="new_rating">
        <option :value="i" v-for='i in 10' :key='i'>{{ i }}</option>
      </select> 
      <span v-if='new_rating'> | <button  @click='vote'>점수 주기</button></span>
      
    </p>

    
    
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
      movie : {},
      rating : null,
      new_rating : null,
    }
  },
  methods : {
    vote : async function () {
      const method = this.rating ? 'PUT' : 'POST'
      const response = await axios({
        method,
        url : SERVER_URL + `/movies/${this.$route.params.movieId}/vote`,
        data : {
          movie_id : this.$route.params.movieId,
          rating : this.new_rating
        },
      })
      .catch((err)=>{
        console.log(err)
      })

      if (!response) return
      this.rating = response.data.rating
    },
    deleteRating : async function () {
      const response = await axios({
        method : 'DELETE',
        url : SERVER_URL + `/movies/${this.$route.params.movieId}/vote`,
        data : {
          movie_id : this.$route.params.movieId,
        },
      }).catch((err)=>{
        console.log(err)
      })

      if (!response) return
      console.log(response.data);
      this.rating = null
    }
  },
  created : async function () {
    // 영화 정보 가져오는 로직
    const response = await axios({
      method : 'POST',
      url: SERVER_URL + `/movies/${this.$route.params.movieId}/`,
    }).catch((err)=>{
      console.log(err);
    })
    if (!response) return
    console.log(response.data);
    this.movie = response.data.movie
    this.rating = response.data.rating
    this.new_rating = response.data.rating
  },
}
</script>

