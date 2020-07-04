import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'

import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Пёсель',
      page: 'Home',
      display: true
    }
  },
  {
    path: '/:breed',
    component: Home,
    meta: {
      title: 'Пёсель',
      page: 'Home',
      display: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.dogs.breeds.length) {
    store.dispatch('dogs/fetchBreeds')
  }
  next()
})

export default router
