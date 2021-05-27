<template>
  <div class="container-sm movie-detail d-block d-lg-flex justify-content-start">
    <img v-if='movie.poster_path'  :src="'http://image.tmdb.org/t/p/w500/'+ movie.poster_path " alt="">
    <!-- 한 묶음 시작 -->
    <div class='flex-fill m-5'>
      <span class='fs-2'>{{ movie.title }} </span>
      <small>({{ movie.original_title }})</small>
      <p v-if="rating">
        내 평점  <span v-for='i in rating' :key='i'>⭐</span>
      </p>
      <p v-else> 이 영화를 평가해주세요⭐ </p>
      <!-- 삭제 로직은 rating이 있을 때만 보내야함 -->
      <!-- 여기에 평가하기 로직 구현 : 평가가 있던 없던 상관 없음 -->
      <p class='d-flex justify-content-center align-items-center score'>
        <span>⭐평점⭐</span>
        <select class="form-select w-25 d-inline" v-model="new_rating">
          <option :value="i" v-for='i in 10' :key='i'>{{ i }}</option>
        </select> 
        <span v-if='new_rating'> 
            <button class='btn mx-2' v-if='rating'  @click='vote'>평점 수정</button> 
            <button class='btn mx-2' v-else  @click='vote'>평점 등록</button> 
          <button class='btn' v-if='rating' @click='deleteRating'>평점 지우기</button>
        </span>
      </p>
      <hr>
      <!-- 영화 overview 시작 -->
      <p v-if='movie.overview'>
        {{ movie.overview }}
      </p>
      <p v-else>
        줄거리가 없어요..
      </p>
      <!-- 영화 overview 끝 -->
      <hr>
      <h3 class='my-4'>이 영화의 리뷰</h3>
      <!-- 이 영화의 리뷰 시작 -->
      <ArticleList :articleList="articleList" :isMovieDetail='true'/>
      <!-- 이 영화의 리뷰 끝 -->
      </div>
    <!-- 한 묶음 끝 -->

  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL
import ArticleList from '@/components/articles/ArticleList'
export default {
  name: 'MovieDetail',
  components :{
    ArticleList
  },
  data : function () {
    return {
      movie : {},
      rating : null,
      new_rating : null,
      articleList: [],
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
        console.log(err.response)
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
        console.log(err.response)
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
      if (err.response.status === 401){
        this.$store.dispatch('logout')
      }
    })
    if (!response) return
    console.log(response.data);
    this.movie = response.data.movie
    this.rating = response.data.rating
    this.new_rating = response.data.rating
    // 리뷰 정보 로직
    axios({
      method: 'get',
      url: `${SERVER_URL}/articles/movie/${this.$route.params.movieId}/`
    }).then((res) => {
      this.articleList = res.data
      console.log(this.articleList)
    }).catch((err) => {
      console.log(err.response)
    })
  },
}
</script>

<style scoped>
ul {
  padding-left : 5px;
}
li {
  list-style: none;

}
b {
  text-align: start;
}

.score > * {
  margin : 2px;
}
</style>