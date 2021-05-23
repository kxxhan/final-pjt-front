<template>
  <div>
    <small>글 번호 : {{ id }}</small>
    <h2>'{{ user.username }}'님의 리뷰 :  {{ title }}</h2>
    <small>작성일 : {{ created_at }} | 수정일 : {{ updated_at }}</small>
    <hr>
    <p> {{ content }}</p>

    <!-- 유저가 일치하는지 여부가 중요할 것 같다. -->
    <button>리뷰 수정</button>
    <button>리뷰 삭제</button>
    <hr>
    <p>이전글 : 모시기모시기</p>  
    <p>다음글 : 모시기모시기</p>  
  </div>
</template>

<script>
export default {
  name : 'ArticleDetail',
  data : function () {
    return {
      id : 6,
      title : '영화리뷰에옹',
      content : '재미있습니다!!',
      created_at : Date.now(),
      updated_at : Date.now(),
      movie : 35,
      user : {
        username : 'ㅋㅋ루삥뽕',
      },
      like_users : [],
    }
  }
}
</script>

<style>

</style>