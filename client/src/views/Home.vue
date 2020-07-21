<template>
  <div class="home">
    <Banner />
    <div class="container mt-4">
      <h4 class="mb-4">List New Products</h4>
      <CardProduct />
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
import CardProduct from '@/components/CardProduct.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    CardProduct,
  },
};
</script>
