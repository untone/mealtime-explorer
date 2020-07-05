import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'

import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:breed?',
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
    store.dispatch('dogs/FETCH_BREEDS')
  }
  if (to.params.breed === 'favourites') {
    store.dispatch('dogs/GET_FAVOURITES')
  } else {
    store.dispatch('dogs/FETCH_DOGS', { params: to.params })
  }
  next()
})

export default router
