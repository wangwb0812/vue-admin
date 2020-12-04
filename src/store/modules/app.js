const state = {
  sidebar: {
    isOpen: true
  }
}

const mutations = {
  SET_SIDEBAR: state => {
    state.sidebar.isOpen = !state.sidebar.isOpen
  }
}

const actions = {
  setSideBar({ commit }) {
    commit('SET_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
