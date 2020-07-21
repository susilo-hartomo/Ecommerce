<template>
  <div id="registerForm" class="row w-100 m-4">
    <div class="card col-8 col-md-4 pt-4">
      <form @submit.prevent="userRegister">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="name"
              class="form-control"
              type="text"
              placeholder="Enter Your Name"
              name="name"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              class="form-control"
              type="email"
              placeholder="Enter Email"
              name="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="psw">Password</label>
            <input
              v-model="password"
              class="form-control"
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />
          </div>

          <div class="form-group">
            <label for="psw">Address</label>
            <input
              v-model="address"
              class="form-control"
              type="text"
              placeholder="Enter Address"
              name="psw"
              required
            />
          </div>

          <div class="form-group">
            <label for="psw">Phone</label>
            <input
              v-model="phone"
              class="form-control"
              type="text"
              placeholder="Enter Phone Number"
              name="psw"
              required
            />
          </div>

          <div class="clearfix">
            <button type="submit" class="btn btn-primary mr-2">Sign Up</button>
            <router-link type="button" class="btn btn-outline-dark" to="/">Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormRegister',
  data: () => ({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  }),
  methods: {
    userRegister() {
      const newShoper = {
        name: this.name,
        email: this.email,
        password: this.password,
        address: this.address,
        phone: this.phone,
      };
      console.log('newShoper: ', newShoper);
      this.$store.dispatch('userRegister', newShoper);
    },
  },
};
</script>

<style>
#registerForm {
  height: 100vh;
  display: flex;
  justify-content: center;
  justify-items: center;
}
</style>
