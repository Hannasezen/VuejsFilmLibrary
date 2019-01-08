export default {
  state: {
    tasks: [
      {
        'id': 1,
        'title': 'title1',
        'description': 'description1',
        'whatWatch': 'Film',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'title2',
        'description': 'description2',
        'whatWatch': 'Show',
        'completed': false,
        'editing': false
      },
      {
        'id': 3,
        'title': 'title3',
        'description': 'description3',
        'whatWatch': 'Film',
        'completed': false,
        'editing': false
      }
    ]
  },
  mutations: {
    newTask (state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    newTask ({commit}, payload) {
      commit('newTask', payload)
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    }
  }
}
