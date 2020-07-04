// import { api } from '@/utils/api'

const api = 'https://dog.ceo/api'

const state = {
  list: [],
  breeds: [],
  progress: false,
  loaded: false
}

const getters = {
  list: state => state.list,
  breeds: state => state.breeds,
  progress: state => state.progress
}

const mutations = {
  SET_PROGRESS (state, progress) {
    state.progress = progress
  },
  SET_LOADED (state, loaded) {
    state.loaded = loaded
  },
  SET_BREEDS (state, breeds) {
    const groupped = breeds.reduce((accumulator, current) => {
      const name = current[0]
      if (!accumulator[name]) {
        accumulator[name] = { name, items: [current] }
      } else {
        accumulator[name].items.push(current)
      }
      return accumulator
    }, {})
    state.breeds = Object.values(groupped)
  }
}

const actions = {
  async fetchBreeds ({ commit }) {
    const response = await fetch(`${api}/breeds/list`)
    const { message } = await response.json()
    commit('SET_BREEDS', message)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
