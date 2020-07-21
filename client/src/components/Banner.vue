<template>
  <div id="banner">
     <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="300">
    <b-carousel-slide id="img-banner" v-for="(banner, index) in this.$store.state.banners" :key="index"
      :img-src=banner.image_banner_url
    ></b-carousel-slide>
  </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  created() {
    this.$store.dispatch('getBanners');
  },
};
</script>

<style>
#img-banner {
  height: 350px;
}
</style>
