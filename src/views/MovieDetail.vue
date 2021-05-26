<template>
  <div class="movie-detail">
    <!-- 영화 리뷰 글 임시 시작 -->
    <hr>
    <ul>
      <li v-for="article in articles" :key='article.id'> 
        No.{{ article.id }} |
        <b>{{ article.title }} </b> <span>{{ article.content }}</span> 
        <br>
        작성자 {{article.user.username}} |
        <small>작성일 : {{ article.created_at }}</small>
      </li>
      <hr>
    </ul>
    <!-- 영화 리뷰 글 임시 끝 -->
    
    <h1>{{ movie.title }} </h1>
    <small>({{ movie.original_title }})</small>
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
      <span v-if='new_rating'> | 
        <button  @click='vote'>
          평점 
          <span v-if='rating'>수정</span> 
          <span v-else >등록</span> 
        </button>
      </span>
    </p>
    <br>
    <img v-if='movie.poster_path' :src="'http://image.tmdb.org/t/p/w500/'+ movie.poster_path " alt="">
    <!-- 여기부터 영화 리뷰 글 페이지 -->

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
      articles : [
        {
          id : 6,
          title : '영화리뷰에옹',
          content : '리뷰 내용이에옹',
          created_at : Date.now(),
          updated_at : Date.now(),
          movie : 35,
          user : {
            username : 'ㅋㅋ루삥뽕',
          },
          like_users : [],
        }
      ],
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
</style>