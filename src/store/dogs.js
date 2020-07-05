const api = 'https://dog.ceo/api'

const state = {
  dogs: [],
  sorted: [],
  favourites: [],
  breeds: [],
  sortByName: false,
  progress: false
}

const getters = {
  dogs: state => state.dogs,
  breeds: state => state.breeds,
  progress: state => state.progress,
  favourites: state => state.favourites,
  sortByName: state => state.sortByName
}

const mutations = {
  SET_PROGRESS (state, progress) {
    state.progress = progress
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
  },
  SET_DOGS (state, dogs) {
    state.dogs = dogs
  },
  APPEND_DOGS (state, dogs) {
    state.dogs = [...state.dogs, ...dogs]
  },
  ADD_FAVOURITE (state, item) {
    state.favourites.push(item)
  },
  REMOVE_FAVOURITE (state, item) {
    const filtered = state.favourites.filter(entry => entry.name !== item.name)
    state.favourites = filtered
  },
  SET_FAVOURITES (state, favourites) {
    state.favourites = favourites
  },
  SAVE_FAVOURITES (state) {
    localStorage.dogsFavourites = JSON.stringify(state.favourites)
  },
  SET_SORT (state) {
    state.sortByName = !state.sortByName
  }
}

const actions = {
  async FETCH_BREEDS ({ commit }) {
    const response = await fetch(`${api}/breeds/list`)
    const { message } = await response.json()
    commit('SET_BREEDS', message)
  },
  async FETCH_DOGS ({ commit }, { params, append }) {
    commit('SET_PROGRESS', true)
    const { breed } = params
    const url = breed === undefined ? '/breeds/image' : `/breed/${breed}/images`
    const response = await fetch(`${api}${url}/random/20`)
    const { message } = await response.json()
    const dogs = message.map(item => {
      const [, , , , name] = item.split('/')
      return {
        name,
        img: item
      }
    })
    const mutation = append ? 'APPEND_DOGS' : 'SET_DOGS'
    setTimeout(() => {
      commit(mutation, dogs)
      commit('SET_PROGRESS', false)
    }, 150)
  },
  async GET_FAVOURITES ({ commit }) {
    const savedItems = await localStorage.dogsFavourites
    if (savedItems !== undefined) {
      const favourites = JSON.parse(savedItems)
      commit('SET_FAVOURITES', favourites)
    }
  },
  ADD_FAVOURITE ({ commit }, payload) {
    commit('ADD_FAVOURITE', payload)
    commit('SAVE_FAVOURITES')
  },
  REMOVE_FAVOURITE ({ commit }, payload) {
    commit('REMOVE_FAVOURITE', payload)
    commit('SAVE_FAVOURITES')
  },
  SET_SORT ({ commit }) {
    commit('SET_SORT')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
