import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import MyEvents from '../views/MyEventsView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  {
    path: '/myevents',
    name: 'myevents',
    component: MyEvents
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
