<template>
  <!-- Article 생성하는 로직을 짜주자. -->
  <div>
    <h1>Article</h1>
    <input type="text" v:model="title" @keyup.enter="getAccordedMovie" placeholder="검색">
    <div>
      <ul>

      </ul>
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
      accorded: [],
      title: '',
      content: '',
    }
  },
  methods: {
    getAccordedMovie: function () {
      
    }
  }
}
</script>