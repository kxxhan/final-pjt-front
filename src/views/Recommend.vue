<template>
<div class="recommend container-fluid" >
<h1>Recommend입니다. 아직 안만들었어요</h1>
<h2>{{ pickedList.length }} / 5</h2> 
<section class='row' v-if="show">
    <RecommendItem class='col' :movie="movie" v-for='movie in movies' :key='movie.id' @picked="getMovieId" />
</section>
</div>
</template>

<script>
import axios from 'axios'
import RecommendItem from '@/components/RecommendItem'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
    name : 'Recommend',
    components : {
        RecommendItem
    },
    data : function () {
        return {
            pickedList : [],
            show : true,
        }
    },
    methods : {
        getMovieId : async function (movieId) {
            this.pickedList.push(
                { 
                    'movie' : movieId,
                    'rating' : 8
                }
                )
            if  (this.pickedList.length >= 5) {
                console.log(this.pickedList);
                this.show = false
                // 이제 여기에서 axios 요청으로 영화 리스트를 보내면
                const response = await axios({
                    method : 'POST',
                    url : SERVER_URL + '/movies/recommend/',
                    data : this.pickedList,
                }).catch((err)=>{
                    console.log(err.response);
                })

                if (response) {
                    console.log(response.data);
                    this.$store.commit('SET_IS_RECOMMENDED')
                    this.$router.push({ name : 'Main'})
                }
                // 각 영화의 장르를 찾아서 이 유저의 평가에 8점을 저장한다.
                // 그리고 main으로 push
            }
            
        }
    },
    created: async function () {
        if (this.$store.state.movies.length)  return 
        const result = await this.$store.dispatch('getMovies')
        if (!result) {
            alert('영화를 서버에서 받아오지 못했습니다.')
        }
    },
    computed : {
        movies : function () {
            return this.$store.state.movies
        }
    },
}
</script>

<style>

</style>