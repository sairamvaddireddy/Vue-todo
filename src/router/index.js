import {
  createRouter,
  createWebHistory
} from 'vue-router'
import TodoHome from '../views/todo-home.vue'
import TodoRegister from '../views/todo-register.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: TodoHome
  },
  {
    path: '/register',
    name: 'Register',
    component: TodoRegister
  },
  {
    path: '/tasks',
    name: 'Tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Tasks/todo-index.vue')
  },
  {
    path: '/tasks/:id/edit',
    name: 'editTask',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Tasks/todo-edit.vue')
  },
  {
    path: '/tasks/create',
    name: 'addTask',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Tasks/todo-add.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router
