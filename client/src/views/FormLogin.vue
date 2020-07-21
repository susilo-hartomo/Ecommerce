<template>
  <div id="loginForm" class="row w-100">
    <div class="col-8 col-md-4">
      <div class="card p-4">
        <form @submit.prevent="userSignIn">
          <h1>Sign In</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" />
          </div>
          <p>
            Dont have account
            <router-link to="/shopers/signUp">Sign Up Now</router-link>
          </p>
          <div class="clearfix">
            <button type="submit" class="btn btn-primary mr-2">Sign Up</button>
            <router-link type="button" class="btn btn-outline-dark" to="/">Cancel</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLogin',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    userSignIn() {
      const userSignin = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('userSignIn', userSignin);
    },
  },
};
</script>

<style>
#loginForm {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
