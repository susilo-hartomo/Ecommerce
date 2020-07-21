import Vue from 'vue';
import Vuex from 'vuex';
import convertRupiah from '@/helpers/convertRupiah';
import router from '../router';

const axios = require('axios');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    isLogin: '',
    carts: [],
    checkouts: [],
  },
  mutations: {
    signIn(state) {
      state.isLogin = true;
    },
    getBanners(state, payload) {
      state.banners = payload;
    },
    getProducts(state, payload) {
      state.products = payload;
    },
    getCarts(state, payload) {
      state.carts = payload;
    },
    addCart(state, payload) {
      state.carts.push(payload)
    },
    deleteCart(state, payload) {
      const updatNewCart = state.carts.filter((x) => x.id !== payload);
      state.carts = updatNewCart;
      console.log('state.carts: ', state.carts);
    },
    updateCart(state, payload) {
      console.log('cart: mutation ', payload);
      state.carts.forEach((el) => {
        if (el.id === payload.id) {
          el.delivery = payload.updatedCart.delivery;
          el.items = payload.updatedCart.items;
          el.price = payload.updatedCart.price;
        }
      });
    },
    getCheckout(state, payload) {
      state.checkouts = payload;
    },
    updateStockProduct(state, payload) {
      state.products.forEach(el => {
        if (el.id == payload.id) {
          el.stock = payload.stock
        }
      });
    }
  },
  actions: {
    userRegister(context, payload) {
      axios({
        method: 'POST',
        url: 'https://glacial-scrubland-14127.herokuapp.com/shopers/register',
        data: payload,
      })
        .then((res) => {
          console.log('res: ', res.data);
          localStorage.setItem('access_token', res.data.access_token);
          context.commit('signIn');
          router.push('/');
        }).catch((err) => {
          console.log(err);
          Swal.fire({
            title: 'Sign vailed',
            text: 'Please fill all form input/ your email is alredy use',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500,
          });
        });
    },
    userSignIn(context, payload) {
      axios({
        method: 'POST',
        url: 'https://glacial-scrubland-14127.herokuapp.com/shopers/login',
        data: payload,
      })
        .then((res) => {
          // console.log('res: ', res.data);
          localStorage.setItem('access_token', res.data.access_token);
          context.commit('signIn');
          router.push('/');
          Swal.fire({
            title: 'Sign Out Succes',
            text: 'You success Sign Out form sistem',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        }).catch((err) => {
          console.log(err);
          Swal.fire({
            title: 'Sign vailed',
            text: 'Please check your email / password',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500,
          });
        });
    },
    getProducts(context) {
      axios({
        method: 'GET',
        url: 'https://glacial-scrubland-14127.herokuapp.com/products',
      })
        .then((res) => {
          context.commit('getProducts', res.data);
        }).catch((err) => {
          console.log(err);
        });
    },
    getBanners(context) {
      axios({
        method: 'GET',
        url: 'https://glacial-scrubland-14127.herokuapp.com/banners',
      })
        .then((res) => {
          context.commit('getBanners', res.data);
        }).catch((err) => {
          console.log(err);
        });
    },
    addCart(context, payload) {
      console.log('payload: ', payload);
      axios({
        method: 'POST',
        url: 'https://glacial-scrubland-14127.herokuapp.com/shopers/transaction',
        headers: {
          access_token: localStorage.access_token,
        },
        data: payload,
      })
        .then((res) => {
          console.log('res: ', res.data);
          context.commit('addCart', res.data)
          Swal.fire({
            title: 'Success add to cart',
            text: 'You can add product to cart again or checkout',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Shooping again!',
            cancelButtonText: 'Checkout',
          })
            .then((result) => {
              if (result.value) {
                router.push('/');
              } else {
                router.push('/transaction');
              }
            });
        }).catch((err) => {
          console.log(err);
        });
    },
    getCarts(context) {
      axios({
        method: 'GET',
        url: 'https://glacial-scrubland-14127.herokuapp.com/shopers/transaction',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((res) => {
          context.commit('getCarts', res.data);
          // router.push('/shopers/transaction')
        }).catch((err) => {
          console.log(err);
        });
    },
    deleteCart(context, payload) {
      console.log('payload: id delete cart', payload);
      axios({
        method: 'DELETE',
        url: `https://glacial-scrubland-14127.herokuapp.com/shopers/transaction/${payload}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((res) => {
          context.commit('deleteCart', payload);
          Swal.fire({
            title: 'Success Deleted Cart',
            text: 'cart success deleted form your cart',
            icon: 'success',
            button: 'false',
            timer: 2000,
          });
        }).catch((err) => {
          console.log(err);
        });
    },
    updateCart(context, payload) {
      // console.log('payload: cart ', payload);
      axios({
        method: 'PUT',
        url: `https://glacial-scrubland-14127.herokuapp.com/shopers/transaction/${payload.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: payload.updatedCart,
      })
        .then((res) => {
          context.commit('updateCart', payload);
          Swal.fire({
            title: 'Cart success updated',
            text: 'Your cart successfully updated',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        }).catch((err) => {
          console.log(err);
        });
    },
    getCheckout(context) {
      axios({
        method: 'GET',
        url: 'https://glacial-scrubland-14127.herokuapp.com/shopers/checkout',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((res) => {
          // console.log('res: ', res.data);
          context.commit('getCheckout', res.data);
        }).catch((err) => {
          console.log(err);
        });
    },
    createCheckout(context, payload) {
      axios({
        method: 'POST',
        url: 'https://glacial-scrubland-14127.herokuapp.com/shopers/checkout',
        headers: {
          access_token: localStorage.access_token,
        },
        data: payload.data,
      })
        .then((res_post) => {
          if (res_post) {
            return axios({
              method: 'DELETE',
              url: `https://glacial-scrubland-14127.herokuapp.com/shopers/transaction/${payload.id}`,
              headers: {
                access_token: localStorage.access_token,
              },
            });
          }
        })
        .then((res_del) => {
          console.log('product: update ', payload);
          if (res_del) {
            return axios({
              method: 'PUT',
              url: `https://glacial-scrubland-14127.herokuapp.com/products/${payload.data.ProductId}`,
              headers: {
                access_token: localStorage.access_token,
              },
              data: payload.product
            });
          }
        })
        .then((result) => {
          if (result) {
            context.commit('deleteCart', payload.id);
            // update stock products
            context.commit('updateStockProduct', {
              id: payload.data.ProductId,
              stock: payload.product.stock
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    rupiah: (state) => {
      const products = state.products.map((x) => ({ ...x, price: convertRupiah(x.price) }));
      return products;
    },
  },
  modules: {
  },
});
