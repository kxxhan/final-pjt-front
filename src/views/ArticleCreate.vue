<template>
  <!-- Article 생성하는 로직을 짜주자. -->
  <div>
    <h1>ArticleCreate</h1>
    <input type="text" v-model="query" @input="getAccordedMovie()" placeholder="검색">
    <section v-if="query">
      <div  v-for="accordedMovie in accordedMovies" :key="accordedMovie.id">
        <ul>
          <!-- 클릭 이벤트 발생시 setMovieInfo 함수 호출 => 선택된 영화의 제목과 id를 data에 저장 -->
          <li @click="setMovieInfo(accordedMovie.title, accordedMovie.id)"> {{ accordedMovie.title }}</li>
        </ul>
      </div>
    </section>
    <div>
    <h3>영화제목 : {{ this.movieTitle }}</h3>
    <input type="text" v-model="credentials.title">
    <br>
    <input type="text" v-model="credentials.content">
    <br>
    <button @click="createArticle">저장</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'ArticleCreate',
  data: function () {
    return {
      accordedMovies: [],
      movieTitle: '',
      query: '',
      credentials : {
        title: '',
        content: '',
        movie : null
        },
      // article에 넣어줄거는 담아서 보내주는게 나을 수도 있겠다.
    }
  },
  methods: {
    getAccordedMovie: function () {
      this.accordedMovies = []
      for (let i = 0; i < this.movies.length; i++) {
        // movies에 담긴 movie 중 title이 query를 포함하고 있는 경우를 모든공백을 제거하고 확인
        if (this.movies[i].title.replace(/(\s*)/g, "").includes(this.query.replace(/(\s*)/g, ""))) {
          //accordedmovies에 넣어준다.
          this.accordedMovies.push(this.movies[i])
        }
      }
    },
    setMovieInfo: function (title, id) {
      this.movieTitle = title
      this.credentials.movie = id
      this.query = ''
    },
    createArticle: function () {
      axios({
        method: 'POST',
        url: `${SERVER_URL}/articles/movie/${this.credentials.movie}/`,
        data: this.credentials
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err.response)
      })
    }
  },
  computed : {
    movies : function () {
      return this.$store.state.movies
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>