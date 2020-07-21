<template>
  <div id="checkout">
    <div class="container">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">No Transaction</th>
            <th scope="col">Date</th>
            <th scope="col">Product</th>
            <th scope="col">Amount</th>
            <th scope="col">Price</th>
            <th scope="col">Delivery</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(checkout, index) in this.$store.state.checkouts" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ checkout.codeTransaction }}</td>
            <td>{{ date(checkout.date) }}</td>
            <td>{{ checkout.productName }}</td>
            <td>{{ checkout.amount }}</td>
            <td>{{ rupiah(checkout.subtotal) }}</td>
            <td>{{ checkout.delivery }}</td>
            <td>{{ checkout.status }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ConvertDate } from '../helpers/convertDate';
import convertRupiah from '../helpers/convertRupiah';

export default {
  name: 'Checkout',
  created() {
    this.$store.dispatch('getCheckout');
  },
  methods: {
    date(Date) {
      return ConvertDate(Date);
    },
    rupiah(nominal) {
      return convertRupiah(nominal);
    },
  },
};
</script>

<style>
#checkout {
    margin: 40px 0px;
}
</style>
