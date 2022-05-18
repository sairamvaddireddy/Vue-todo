<template>
  <div>
    <h1>Edit {{task.name}}</h1>
    <form class="w-25 m-auto" @submit.prevent="update">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="task.name" placeholder="Enter name" :class="{'is-invalid' : errors.name}">
            <span class="invalid-feedback">{{ errors.name }}</span>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Update</button>
    </form>
    <button @click="$router.back()" class="btn btn-secondary mt-3">Cancel</button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  created() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const {data} = await axios.get(`${process.env.VUE_APP_BASE_API}/tasks/`+ this.$route.params.id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
        this.task = data.task;
      } catch(e) {
        if (e.response.status == 401) {
          localStorage.removeItem('token');
          this.$router.push('/');
        }
      }
    },
    async update() {
        let headers = {"Authorization" : `Bearer ${localStorage.getItem('token')}`};
      try {
        const {data} = await axios.put(`${process.env.VUE_APP_BASE_API}/tasks/` + this.$route.params.id, this.task, {headers: headers});
        if (data.status) {
          this.$swal('success', data.message, 'success');
          this.$router.push('/tasks');
        } else {
          this.$swal('oops!', 'something went wrong! try again!!', 'error');
        }
      } catch(e) {
        if (e.response.status == 401) {
          localStorage.removeItem('token');
          this.$router.push('/');
        } else if(e.response.status == 422) {
          let data = e.response.data;
          if (data.errors?.name || false) {
              this.errors.name = data.errors.name[0];
          } else {
              this.errors.name = '';
          }
        }
      }
    },
  },
  data() {
    return {
      task: {},
      errors: {
          name: '',
          quantity: '',
          price: ''
      }
    }
  },


}
</script>