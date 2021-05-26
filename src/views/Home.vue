<template>
<div class=''>
    <h1 class=''>Home입니다. 아직 안만들었어요</h1>
    <div class="container-sm">100% wide until small breakpoint</div>
    <div class="container-md">100% wide until medium breakpoint</div>
    <div class="container-lg">100% wide until large breakpoint</div>
    <div class="container-xl">100% wide until extra large breakpoint</div>
    <div class="container-xxl">100% wide until extra extra large breakpoint</div>
    <div class="container-fluid">fluid</div>
</div>
</template>

<script>
export default {
    name : 'Home'
}
</script>
<style scoped>
.container-sm {
    background-color: aqua;
}
.container-md {
    background-color: crimson;
}
.container-lg {
    background-color: coral;
}
.container-xl {
    background-color: cornflowerblue;
}
.container-xxl {
    background-color: chartreuse;
}
.container-fluid {
    background-color: grey;
}
</style>