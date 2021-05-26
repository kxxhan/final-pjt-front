<template>
  <div> 
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Movie</th>
          <th scope="col">Title</th>
          <th scope="col">Name</th>
          <th scope="col">When</th>
        </tr>
      </thead>
      <tbody>
        <ArticleListItem 
        v-for="page in paginatedData" :key="page.id"
        :page="page"
        />
      </tbody>
    </table>
    <div class="btn-cover">
        <ul class="pagination">
          <li class="page-item page-link" @click="prevPage">Previous</li>
          <li class="page-item page-link" v-for="i in pageCount" :key="i" @click="setPageNum(i-1)">{{i}}</li>
          <li class="page-item page-link" @click="nextPage">Next</li>
        </ul>
    </div>
  </div>
</template>
<script>
import ArticleListItem from '@/components/articles/ArticleListItem.vue'
export default {
  name: 'ArticleList',
  data: function () {
    return {
      pageNum: 0,
    }
  },
  components: {
    ArticleListItem
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
      if (this.pageNum >= this.pageCount - 1) return
      this.pageNum += 1
    },
    prevPage: function () {
      if (this.pageNum === 0) return
      this.pageNum -= 1
    },
    setPageNum: function (i) {
      console.log(this.pageCount)
      console.log(i)
      this.pageNum = i
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
    },
    disAbled: function () {
      // if (this.pageNum === 0 || this.pageNum >= this.pageCount - 1) {
      //   return true
      // } else {
      //   return false
      // }
      return true
    }

  },
  // created: {

  // }
}
</script>

