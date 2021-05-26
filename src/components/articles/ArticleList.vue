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
    <div class="page">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled : !pageNum }" @click="prevPage">
            <a href="#" class="page-link">Prev</a>
          </li>
          <li class="page-item" :class="{ active : i-1 === pageNum }" v-for="i in pageCount" :key="i" @click="setPageNum(i-1)">
            <a href="#" class="page-link">{{i}}</a>
          </li>
          <li class="page-item" :class="{ disabled : pageNum === pageCount - 1 }" @click="nextPage">
            <a href="#" class="page-link">Next</a>
          </li>
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
        this.pageNum += 1
    },
    prevPage: function () {
        this.pageNum -= 1
    },
    setPageNum: function (i) {
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
    // isCurrentPage: function () {
    //   const pageArr = []
    //   for(let i = 0; i < this.pageCount; i++) {
    //     pageArr.push(false)
    //   }
    //   pageArr[this.pageNum] = true
    //   return pageArr[]
    // }
  },
  // created: {

  // }
}
</script>
<style scoped>
  .page {
    text-align: center;
    width: 100%;
  }
  .pagination {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }
  .pagination li {
    display: inline;
    text-align: center;
  }
  /* 효과가 딱히 없음 */
  .pagination a{
    display: inline;
    text-align: center;
    float: left;
    display: block;
    font-size: 14px;
    text-decoration: none;
    background-color: #ffffff;
    color: #212529;
  }

  .page-item.active .page-link {
    cursor: pointer;
    background-color: #ea5249!important;
    border-color: #ea5249;
    color: #ffffff;
  }
  .page-item.active a:hover {
    color: #ea5249;
    background-color: #ffffff!important;
    cursor: pointer;
  }
</style>
