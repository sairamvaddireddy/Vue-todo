<template>
  <div class="home">
    <h1>Register</h1>
      <form class="w-25 m-auto" @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="name" class="form-control" id="name" v-model="name" placeholder="Enter name" :class="{'is-invalid' : errors.name}">
          <span class="invalid-feedback">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" :class="{'is-invalid' : errors.email}">
          <span class="invalid-feedback">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" :class="{'is-invalid' : errors.password}">
          <span class="invalid-feedback">{{ errors.password }}</span>
        </div>
        <div class="form-group">
          <label for="c_password">Confirm Password</label>
          <input type="password" class="form-control" id="c_password" v-model="c_password" placeholder="Confirm Password" :class="{'is-invalid' : errors.c_password}">
          <span class="invalid-feedback">{{ errors.c_password }}</span>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
      </form>
      <router-link :to="{ name: 'Home' }" class="mt-6">Already Registered? Login Here</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TodoRegister',
  created() {
    if (localStorage.getItem('token')) {
      this.$router.push('/tasks');
    }
  },
  data() {
    return {
      'name': '',
      'email': '',
      'password': '',
      'c_password': '',
      'errors': {
        'name': '',
        'email': '',
        'password': '',
        'c_password': '',
      }
    }
  },
  methods: {
    async register() {
      this.validate();
      try {
        const {data} = await axios.post(`${process.env.VUE_APP_BASE_API}/register`, {'name': this.name,'email': this.email, 'password': this.password, 'c_password': this.c_password});
        console.log(data);
        if (data.status) {
          localStorage.setItem('token', data.token);
          this.$router.push('/tasks');
        }
        if (data.errors?.name || false) {
          this.errors.name = data.errors.name[0];
        }
        if (data.errors?.email || false) {
          this.errors.email = data.errors.email[0];
        }
        if (data.errors?.password || false) {
          this.errors.password = data.errors.password[0];
        }
        if (data.errors?.c_password || false) {
          this.errors.c_password = data.errors.c_password[0];
        }
      } catch(e) {
        console.log(e);
      }
    },
    validate() {
      if (!this.name) {
        this.errors.name = 'Name is required';
      } else {
        this.errors.name = '';
      }
      if (!this.email) {
        this.errors.email = 'Email is required';
      } else {
        this.errors.email = '';
      }
      if (!this.password) {
        this.errors.password = 'Password is required';
      } else {
        this.errors.password = '';
      }
      if (!this.c_password) {
        this.errors.c_password = 'Confirm Password is required';
      } else if(this.password != this.c_password){
        this.errors.c_password = 'Password and ConfirmPassword Does not match';
      }else{
          this.errors.c_password = '';
      }
      return;
    }
  }
}

</script>
