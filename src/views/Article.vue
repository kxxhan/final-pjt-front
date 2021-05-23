<template>
  <!-- Article 생성하는 로직을 짜주자. -->
  <div>
    <h1>Article</h1>
    <input type="text" v-model="query" @input="getAccordedMovie(query)" placeholder="검색">
    <div v-for="accordemovie in accordedmovies" :key="accordemovie.id">
      <ul>
        <li @click="setMovieTitle(accordemovie.title)"> {{ accordemovie.title }}</li>
      </ul>
    </div>
    <div>
    <h3>영화제목 : {{ this.movietitle }}</h3>
    <input type="text" :v-model="articletitle">
    <br>
    <input type="text" :v-model="content">
    <br>
    <button>저장</button>
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
export default {
  name: 'Article',
  data: function () {
    return {
      movies: this.$store.state.movies,
      accordedmovies: [],
      query: '',
      movietitle: '',
      articletitle: '',
      content: '',
      // article에 넣어줄거는 담아서 보내주는게 나을 수도 있겠다.
    }
  },
  methods: {
    getAccordedMovie: function (query) {
      this.accordedmovies = []
      for (let i = 0; i < this.movies.length; i++) {
        if (this.movies[i].title.replace(/(\s*)/g, "").includes(query.replace(/(\s*)/g, ""))) {
          // console.log(query)
          this.accordedmovies.push(this.movies[i])
        }
      }
      // console.log(query.replace(/(\s*)/g, ""))
      // console.log(this.accordedmovies)
    },
    setMovieTitle: function (select) {
      this.movietitle = select
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>