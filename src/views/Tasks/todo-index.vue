<template>
  <div class="w-50 m-auto">
    <div>
      <h1>Tasks</h1>
      <button class="float-end btn btn-primary" @click="add">Add</button>
    </div>
    <table class="table table-striped">
      <thead class="thead-dark">
        <th>ID</th>
        <th>Name</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.name }}</td>
          <td>
            <button @click="editTask(task.id)" class="btn btn-warning btn-sm">Edit</button>
            <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
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
        const {data} = await axios.get(`${process.env.VUE_APP_BASE_API}/tasks`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
        this.tasks = data.tasks.data;
      } catch(e) {
        if (e.response.status == 401) {
          localStorage.removeItem('token');
          this.$router.push('/');
        }
      }
    },
    async deleteTask(id) {
      try {
        const {data} = await axios.delete(`${process.env.VUE_APP_BASE_API}/tasks/${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
        if (data.status) {
          this.$swal('success', data.message, 'success');
          this.fetchData();
        } else {
          this.$swal('oops!', 'something went wrong! try again!!', 'error');
        }
      } catch(e) {

        if (e.response.status == 401) {
          localStorage.removeItem('token');
          this.$router.push('/');
        }
      }
    },
    async editTask(id) {
      this.$router.push({ name: 'editTask', params: {id: id}});
    },
    add() {
      this.$router.push({name: 'addTask'});
    }
  },
  data() {
    return {
      tasks: {}
    }
  },


}
</script>