<template>
  <div> 
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Movie</th>
          <th scope="col">Title</th>
          <th scope="col">Name</th>
          <th scope="col">When</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in paginatedData" :key="page.id">
          <th scope="row">1</th>
          <td>{{ page.movie.title }}</td>
          <td>
            <router-link :to="{ path : `/board/${page.id}` }">{{ page.title }}</router-link>
          </td>
          <td>{{ page.user.username }}</td>
          <td>{{ new Date(page.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
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
  // created: {

  // }
}
</script>

