<template>
  <div>
    <table>
      <tr>
        <th>Movie</th>
        <th>Title</th>
        <th>Name</th>
        <th>When</th>
      </tr>
      <tr v-for="page in paginatedData" :key="page.id">
        <td>{{ page.movie.title }}</td>
        <td>
          <router-link :to="{ path : `/board/${page.id}` }">{{ page.title }}</router-link>
        </td>
        <td>{{ page.user.username }}</td>
        <td>{{ new Date(page.created_at).toLocaleString() }}</td>
      </tr>
    </table>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  data: function () {
    return {
      pageNum: 0,
    }
  },
  props: {
    articleList: {
      type: Array,
      required: true,
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10 
    }
  },
  methods: {
    nextPage: function () {
      this.pageNum += 1
    },
    prevPage: function () {
      this.pageNum -= 1
    }
  },
  computed: {
    pageCount: function () {
      let listLeng = this.articleList.length
      let listSize = this.pageSize 
      let page = Math.floor(listLeng / listSize)

      if (listLeng % listSize > 0) page += 1

      return page
    },
    paginatedData: function () {
      const start = this.pageNum * this.pageSize
      const end = start + this.pageSize
      
      return this.articleList.slice(start,end)
    }
  },
  created: {

  }
}
</script>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
