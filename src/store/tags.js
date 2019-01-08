export default {
  state: {
    tags: [
      {
        title: 'comedy',
        use: false
      },
      {
        title: 'western',
        use: false
      },
      {
        title: 'adventure',
        use: false
      }
    ]
  },
  mutations: {
    newTag (state, payload) {
      state.tags.push(payload)
    }
  },
  actions: {
    newTag ({commit}, payload) {
      commit('newTag', payload)
    }
  },
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
