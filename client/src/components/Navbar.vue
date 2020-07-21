<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <router-link class="navbar-brand" href to="/">
          <img src="../assets/img/logo.png" class="mr-2" />
          Encusilo
        </router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <!-- <li class="nav-item active">
              <router-link class="nav-link" href to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li> -->
          </ul>
          <div id="isLogin" v-if="this.$store.state.isLogin">
            <router-link class="btn btn-outline-dark mr-2" to="/transaction">
            <i class="fa fa-cart-arrow-down"></i></router-link>
            <router-link class="btn btn-outline-dark mr-2 py-1 px-2" to="/checkout">
              <i class="material-icons">swap_vert</i>
            </router-link>
            <button
              class="btn btn-outline-dark my-2 my-sm-0"
              type="submit"
              @click.prevent="signOut"
            >Sign Out</button>
          </div>
          <div v-else>
            <button
              class="btn btn-outline-dark my-2 my-sm-0 mr-2"
              type="submit"
              @click.prevent="signIn"
            >Sign In</button>
            <button class="btn btn-dark my-2 my-sm-0"
            type="submit"
            @click.prevent="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({ }),
  methods: {
    signOut() {
      this.$store.state.isLogin = false;
      localStorage.clear();
      this.$router.push('/');
      Swal.fire({
        title: 'Sign Out Succes',
        text: 'You success Sign Out form sistem',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    signUp() {
      this.$router.push('/shopers/signUp');
    },
    signIn() {
      this.$router.push('/shopers/signIn');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
.navbar {
  background-color: #58b4ae;
}

.navbar-brand {
  font-family: montserrat;
  font-size: 16pt;
  font-weight: 600;
}
</style>
