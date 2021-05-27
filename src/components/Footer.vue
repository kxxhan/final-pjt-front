<template>
    <!-- Footer -->
  
  <footer class="text-center text-md-start bg-light text-muted footer" style="margin-top : 80px align-items:bottom">
    <!-- Section: Social media -->
    <section
      class="d-flex justify-content-center p-3"
    >
      <!-- Right -->
        <a href="mailto:ofliberty2@gmail.com" class="me-4 text-reset">
          <i class="fab fa-google"></i>
        </a>
        <a href="https://www.instagram.com/ilongforthat/" class="me-4 text-reset">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/%EA%B1%B4-%ED%95%9C-611533206/" class="me-4 text-reset">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://lab.ssafy.com/wns312/final-pjt-front" class="me-4 text-reset">
          <i class="fab fa-gitlab"></i>
        </a>
      
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
    <!-- Copyright -->
    <div class="text-center bg-light" style="padding-bottom : 20px">
      © 2021 Copyright:
      <a class="text-reset fw-bold" href="#">J Y KIM & K HAN</a>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>
<script>
export default {
  name: 'Footer',
  data: function () {
    return {

    }
  },
}
</script>

<style scoped>
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height : 100px;
  }
a {
  margin : 5px !important;
}
</style>