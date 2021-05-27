<template>
<section class='d-block d-md-flex '>
    <!-- <div> -->
        <img class='mb-5' :src="'http://image.tmdb.org/t/p/w500/' + article.movie.poster_path" >
        <!-- <h3 class='mt-2'>{{ article.movie.title }}</h3> -->
    <!-- </div> -->
    <div class='flex-fill ms-5'>
        <p class='mt-2 fs-2'>🎬 {{ article.movie.title }}</p>
        <p class='title fs-3'>{{ article.title }} <small>by {{article.user.username}}</small> </p>    
        <small>작성일 : {{ new Date(article.created_at).toLocaleString() }}</small>
        <br>
        <small>수정일 : {{ new Date(article.updated_at).toLocaleString() }}</small>
        <hr>
        <p class='content'> {{ article.content }}</p>
    </div>
</section>
</template>

<script>
export default {
    name : 'ArticleContent',
    props : {
        article : {
            type : Object,
            required : true
        }
    }

}
</script>

<style scoped>
img {
    max-width : 400px;
}


.title > small {
    font-size: 0.8rem;
}

.flex-fill {
    text-align: start;
    padding: 5px 20px;
}

.content{
    min-height : 250px;
}

</style>