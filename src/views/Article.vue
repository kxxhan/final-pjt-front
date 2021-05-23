<template>
  <!-- Article 생성하는 로직을 짜주자. -->
  <div>
    <h1>Article</h1>
    <input type="text" v-model="query" @input="getAccordedMovie(query)" placeholder="검색">
    <div v-for="accordemovie in accordedmovies" :key="accordemovie.id">
      <ul>
        <!-- 클릭 이벤트 발생시 setMovieInfo 함수 호출 => 선택된 영화의 제목과 id를 data에 저장 -->
        <li @click="setMovieInfo(accordemovie.title, accordemovie.id)"> {{ accordemovie.title }}</li>
      </ul>
    </div>
    <div>
    <h3>영화제목 : {{ this.movietitle }}</h3>
    <input type="text" v-model="credentials.articletitle">
    <br>
    <input type="text" v-model="credentials.content">
    <br>
    <button @click="createArticle">저장</button>
    </div>
  </div>
  <!-- 어떤 영화인지 검색할 query를 담을 input -->
  
  <!-- query를 날릴 버튼 -->
  <!-- 쿼리를 바탕으로 일치하는 영화들을 보여줄 list -->
  <!-- list에 있는걸 클릭하면 영화 title을 선택??? -->


  <!-- title -->
  <!-- content -->

</template>
<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Article',
  data: function () {
    return {
      movies: this.$store.state.movies,
      accordedmovies: [],
      query: '',
      movietitle: '',
      selectedmovieId: '',
      credentials : {
        articletitle: '',
        content: '',
      },
      // article에 넣어줄거는 담아서 보내주는게 나을 수도 있겠다.
    }
  },
  methods: {
    getAccordedMovie: function (query) {
      this.accordedmovies = []
      for (let i = 0; i < this.movies.length; i++) {
        // movies에 담긴 movie 중 title이 query를 포함하고 있는 경우를 모든공백을 제거하고 확인
        if (this.movies[i].title.replace(/(\s*)/g, "").includes(query.replace(/(\s*)/g, ""))) {
          //accordedmovies에 넣어준다.
          this.accordedmovies.push(this.movies[i])
        }
      }
    },
    setMovieInfo: function (title, id) {
      this.movietitle = title
      this.selectedmovieId = id
    },
    createArticle: function () {
      axios({
        method: 'POST',
        url: `${SERVER_URL}/articles/movie/${this.selectedmovieId}/`,
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>