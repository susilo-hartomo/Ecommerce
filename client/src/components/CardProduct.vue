<template>
  <div id="products">
    <div v-for="(product, index) in this.$store.getters.rupiah" :key="index">
      <div class="card m-2" style="width: 14rem;">
        <img :src="product.image_url" class="card-img-top" alt="..." style="height: 12rem" />
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">Price : {{product.price}}</p>
          <p>Stock : {{product.stock}}</p>
          <div v-if="product.stock > 0">
            <a class="btn btn-primary" @click.prevent="addCart(product)">Add Cart</a>
          </div>
          <div v-else>
            <h4>Out of stock</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  created() {
    this.$store.dispatch("getProducts");
    this.$store.dispatch('getCarts');
  },
  methods: {
    addCart(product) {
      if (!localStorage.access_token) {
        this.$router.push("/shopers/signIn");
      } else {
        let checkProductInCart = false;
        console.log('checkProductInCart: ', checkProductInCart);
        this.$store.state.carts.forEach(el => {
          if (el.ProductId == product.id) {
            checkProductInCart = true;
            Swal.fire({
              title: "Product is valiable in cart",
              text: "Please goto chart",
              icon: "info",
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
        console.log('checkProductInCart: ', checkProductInCart);
        if (!checkProductInCart) {
          const addProductCart = {
            ProductId: product.id,
            delivery: "JNE",
            items: 1,
            price: this.$store.state.products.filter(
              x => x.id === product.id
            )[0].price
          };
          console.log("addProductCart: ", addProductCart);
          this.$store.dispatch("addCart", addProductCart);
        }
      }
    }
  }
};
</script>

<style scope>
#products {
  display: flex;
  width: 100%;
}
</style>
