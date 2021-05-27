<template>
  <div>
    <h1>ArticleCreate</h1>
    <br>
    <h3 v-if='movieTitle'>🎬 {{ movieTitle }}</h3>
    <form class="row g-3 form"  @submit.prevent='createArticle'>
      <div class="mb-3 row">
        <label for="movie" class="col-sm-2 col-form-label">Movie</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="movie" v-model="query" placeholder="검색"  @input="getAccordedMovie()" >
        </div>
      </div>
      <section v-if="query">
        <div v-for="accordedMovie in accordedMovies" :key="accordedMovie.id">
          <ul>
            <li @click="setMovieInfo(accordedMovie.title, accordedMovie.id)"> {{ accordedMovie.title }}</li>
          </ul>
        </div>
      </section>

      <div class="mb-3 row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="title" v-model="credentials.title" placeholder="Title">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="content" class="col-sm-2 col-form-label">Content</label>
        <div class="col-sm-10">
          <textarea type="text" class="form-control" id="content" v-model="credentials.content" placeholder="Content"></textarea>
        </div>
      </div>
      <p class='d-flex justify-content-end pe-3'>
      <button class="btn mx-2" type="submit">저장</button>
      <router-link class='a-to-btn me-4' :to="{ name : 'Article' }">취소</router-link> 
      </p>
    </form>
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
    }
  },
  methods: {
    getAccordedMovie: function () {
      this.accordedMovies = []
      for (let i = 0; i < this.movies.length; i++) {
        // movies에 담긴 movie 중 title이 query를 포함하고 있는 경우를 모든공백을 제거하고 확인
        if (this.movies[i].title.replace(/(\s*)/g, "").includes(this.query.replace(/(\s*)/g, ""))) {
          this.accordedMovies.push(this.movies[i]) //accordedmovies에 넣어준다.
        }
      }
    },
    setMovieInfo: function (title, id) {
      this.movieTitle = title
      this.credentials.movie = id
      this.query = ''
    },
    createArticle: function () {
      if(!this.isValid()) return
      axios({
        method: 'POST',
        url: `${SERVER_URL}/articles/movie/${this.credentials.movie}/`,
        data: this.credentials
      }).then((res) => {
        console.log(res)
        if (res.status ===200){
          this.$router.push({ path: `/board/${res.data.id}` })
        }
      }).catch((err) => {
        console.log(err.response)
      })
    },
    isValid: function () {
      if(!this.credentials.movie){
        alert('영화를 고르지 않았습니다')
        return false
      }else if(!this.credentials.title || !this.credentials.content) {
        alert('빈 항목을 작성해 주세요')
        return false
      }
      return true
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
#content {
  height: 300px;
}

h1, h3 {
  margin : 10px auto;
}

.form {
  margin : 50px auto;
}
</style>