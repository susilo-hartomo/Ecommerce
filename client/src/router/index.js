import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/shopers/signUp',
    name: 'FormRegister',
    component: () => import('../views/FormRegister.vue'),
  },
  {
    path: '/shopers/signIn',
    name: 'FormLogin',
    component: () => import('../views/FormLogin.vue'),
  },
  {
    path: '/transaction',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    beforeEnter(to, from, next) {
      if (!localStorage.access_token) {
        next({ name: 'FormLogin' });
      } else {
        next();
      }
    },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    beforeEnter(to, from, next) {
      if (!localStorage.access_token) {
        next({ name: 'FormLogin' });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.access_token) {
    store.state.isLogin = false;
    next();
  } else {
    store.state.isLogin = true;
    next();
  }
});

export default router;
