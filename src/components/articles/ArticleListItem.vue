<template>
    <tr>
      <th scope="row">{{ article.id }}</th>
      <td>
      <div v-if='isMovieDetail'>{{ article.movie.title }}</div>
      <router-link v-else class='a-in-tr' :to="{ path : `movie/${article.movie.id}` }">{{ article.movie.title }}</router-link>
      </td>
      <td>
        <router-link class='a-in-tr' :to="{ path : `/board/${article.id}` }">{{ article.title }}</router-link>
      </td>
      <td>{{ article.user.username }}</td>
      <td>{{ new Date(article.created_at).toLocaleString() }}</td>
    </tr>
</template>
<script>
export default {
  name: 'ArticleListItem',
  data: function () {
    return {
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    isMovieDetail : {
      type : Boolean,
      required : true
    }
  },
  methods: {
  },
  created : function () {
    console.log(this.article);
  }
}
</script>

<style scoped>
tr:hover{
  transition: 0.4s !important ;
  background-color: #ea5249 !important ;
  color: #ffffff !important ;
}

.a-in-tr:hover {
  transition: 0.4s !important ;
  color: #ffffff !important ;
  text-decoration: underline;
}
</style>