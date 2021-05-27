<template>
<div class="recommend container-sm" >
<h3>좋아하는 영화를 골라주세요 😋</h3>
<div class="progress my-3">
    <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width: progress}" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<h3>{{ pickedList.length }} / 5</h3> 
<section class='d-flex flex-wrap' v-if="show">
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
            this.pickedList.push({ 
                'movie' : movieId,
                'rating' : 8
            })
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
        },
        progress : function () {
            console.log(''+(this.pickedList.length/5*100)+'%');
            return ''+(this.pickedList.length/5*100)+'%'
        }
    },
}
</script>

<style scoped>
h3{
    text-align: center;
}
.progress {
    height: 30px;
    
}
.progress-bar {
    background-color : #ea5249;
}
</style>