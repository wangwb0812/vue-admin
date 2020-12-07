import {
	login
} from '@/api/user'

const state = {
	userInfo: null,
	menuList: []
}

const mutations = {
	SET_USER_INFO(state, data) {
		state.userInfo = data
	},
	SET_MENU_LIST(state, data) {
		state.menuList = data
	}
}

const actions = {
	// 登录
	loginByPwd({
		commit
	}, params) {
		return new Promise((resolve, reject) => {
			login(params).then(response => {
				commit('SET_USER_INFO', response)
				resolve(response)
			}).catch(err => {
				reject(err)
			})
		}).catch(error => {
			throw new Error(error)
		})
	},
	// 设置菜单
	setMenuList({
		commit
	}, params) {
		commit('SET_MENU_LIST', params)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
