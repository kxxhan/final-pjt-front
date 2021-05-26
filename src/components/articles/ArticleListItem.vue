<template>
    <tr>
      <th scope="row">{{ page.id }}</th>
      <td>{{ page.movie.title }}</td>
      <td>
        <router-link :to="{ path : `/board/${page.id}` }">{{ page.title }}</router-link>
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