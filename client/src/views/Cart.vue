<template>
  <div id="cart">
    <div class="container">
      <h2 class="mt-4 mb-4">Cart List</h2>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Delivery</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart, index) in this.$store.state.carts" :key="index">
            <th scope="row">{{index + 1}}</th>
            <td>
              <img :src="cart.Product.image_url" alt style="width: 80px; max-height: 80px" />
            </td>
            <td>{{cart.Product.name}}</td>
            <td>{{TotalPrice(cart.Product.price, cart.items, cart.delivery).rupiah}}</td>
            <td>
              <form>
                <input
                  type="number"
                  class="custom-select"
                  v-model="cart.items"
                  min="1"
                  :max="cart.Product.stock"
                />
              </form>
            </td>
            <td>
              <select class="custom-select" v-model="cart.delivery">
                <option>JNE</option>
                <option>TIKI</option>
                <option>SICEPAT</option>
              </select>
            </td>
            <td>
              <button
                @click.prevent="updateCart(
                  cart.id, cart.Product.id,
                  cart.delivery, cart.items,
                  TotalPrice(cart.Product.price,
                  cart.items, cart.delivery).nilai,
                  cart.Product.stock)"
                type="button"
                rel="tooltip"
                class="btn btn-success mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="update"
              >
                <i class="material-icons">update</i>
              </button>
              <button
                @click.prevent="deleteCart(cart.id)"
                type="button"
                rel="tooltip"
                class="btn btn-danger"
                data-toggle="tooltip"
                data-placement="top"
                title="delete"
              >
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
          <tr v-if="this.$store.state.carts.length > 0">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <h2>Subtotal</h2>
            </td>
            <td>
              <h2>{{Subtotal}}</h2>
            </td>
            <td>
              <button class="btn btn-primary" @click.prevent="checkout">Checkout</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import convertRupiah from '../helpers/convertRupiah';

export default {
  name: 'Cart',
  data: () => ({
  }),
  created() {
    this.$store.dispatch('getCarts');
  },
  methods: {
    updateCart(id, ProductId, delivery, items, SubTotal, stock) {
      if(items > stock || items < 1) {
        Swal.fire({
          title: 'Sorry your mount out off stock',
          text: 'Stock is not available',
          icon: 'warning',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        const updatedCart = {
          ProductId,
        delivery,
        items,
        price: SubTotal,
      };
      console.log('updatedCart: ', updatedCart);
      this.$store.dispatch('updateCart', { id, updatedCart });
      }
    },
    deleteCart(id) {
      Swal.fire({
        title: 'Are you sure to delete this cart?',
        text: 'You can delete this cart with click Delete Button',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Cancel',
        cancelButtonText: 'Delete Cart',
      }).then((result) => {
        if (result.value) {
          this.$router.push('/transaction');
        } else {
          this.$store.dispatch('deleteCart', id);
        }
      });
    },
    TotalPrice(price, item, delivery) {
      let totalPrice = price * item;
      switch (delivery) {
        case 'JNE':
          totalPrice += 10000;
          break;
        case 'TIKI':
          totalPrice += 12000;
          break;
        case 'SICEPAT':
          totalPrice += 9000;
          break;
        default:
          break;
      }
      return { rupiah: convertRupiah(totalPrice), nilai: totalPrice };
    },
    checkout() {
      Swal.fire({
        title: 'Are you sure to Checkout all cart?',
        text: 'Checkout all cart then pay and get you product!',
        icon: 'info',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Checkout Now',
        cancelButtonText: 'cancel',
      }).then((result) => {
        if (result.value) {
          this.$store.state.carts.forEach((el) => {
            const newCheckout = {
              codeTransaction: `XX/C/${new Date().toString().slice(0, 10)}`,
              ProductId: el.Product.id,
              productName: el.Product.name,
              amount: el.items,
              subtotal: el.price,
              delivery: el.delivery,
            };
            const updateStockProduck = {
              name: el.Product.name,
              image_url: el.Product.image_url,
              stock: el.Product.stock - Number(el.items),
              price: el.Product.price,
            }
            this.$store.dispatch('createCheckout', {
              data: newCheckout,
              id: el.id,
              product: updateStockProduck
            });
          });
          Swal.fire({
            title: 'Checkout Succes',
            text: 'Checkout all product successfullty',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/checkout');
        } else {
          this.$router.push('/transaction');
        }
      });
    },
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    Subtotal() {
      let totalPrice = 0;
      this.$store.state.carts.forEach((el) => {
        totalPrice += el.price;
      });
      return convertRupiah(totalPrice);
    },
  },
};
</script>

<style>
</style>
