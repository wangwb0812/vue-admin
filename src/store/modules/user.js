import { login } from '@/api/user'

const state = {
	userInfo: null
}

const mutations = {
	SET_USER_INFO(state, data) {
		state.userInfo = data
	}
}

const actions = {
	loginByPwd({ commit }, params) {
	  return new Promise((resolve, reject) => {
			login(params).then(response => {
				commit('SET_USER_INFO', response)
				resolve(response)
			})
		}).catch(err => {
			reject(error)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}