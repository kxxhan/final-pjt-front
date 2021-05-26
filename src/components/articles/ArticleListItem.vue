<template>
    <tr>
      <th scope="row">{{ page.id }}</th>
      <td>
      <router-link class='a-in-tr' :to="{ path : `/board/${page.id}` }">{{ page.movie.title }}</router-link>
      </td>
      <td>
        <router-link class='a-in-tr' :to="{ path : `/board/${page.id}` }">{{ page.title }}</router-link>
      </td>
      <td>{{ page.user.username }}</td>
      <td>{{ new Date(page.created_at).toLocaleString() }}</td>
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
    page: {
      type: Object,
      required: true
    }
  },
  methods: {

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