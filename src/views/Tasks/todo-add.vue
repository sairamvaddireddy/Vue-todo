<template>
  <div>
    <h1>Add Task</h1>
    <form class="w-25 m-auto" @submit.prevent="create">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="task.name" placeholder="Enter name" :class="{'is-invalid' : errors.name}">
            <span class="invalid-feedback">{{ errors.name }}</span>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Create</button>
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
  methods: {
    async create() {
        let headers = {"Authorization" : `Bearer ${localStorage.getItem('token')}`};
      try {
        const {data} = await axios.post(`${process.env.VUE_APP_BASE_API}/tasks/`, this.task, {headers: headers});
        if (data?.status || false) {
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
      task: {
          name: ''
      },
      errors: {
          name: ''
      }
    }
  },


}
</script>