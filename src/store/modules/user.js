import { login } from '@/api/user'

const state = {
	userInfo: null,
	menuList: [
		{
		  id: '0',
			name: 'Home',
			title: '首页',
			path: '/home',
			menuIcon: 'el-icon-s-help'
		},
		{
		  id: '1',
			name: 'User',
			title: '用户',
			path: '/user',
			menuIcon: 'el-icon-user-solid',
			children: [
				{
					id: '1-1',
					name: 'UserInfo',
					title: '用户信息',
					path: '/user/info',
					menuIcon: 'el-icon-user'
				},
				{
					id: '1-2',
					name: 'UserResetPsd',
					title: '修改密码',
					path: '/user/resetPsd',
					menuIcon: 'el-icon-edit'
				}
			]
		}
	]
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
	loginByPwd({ commit }, params) {
	  return new Promise((resolve, reject) => {
			login(params).then(response => {
				commit('SET_USER_INFO', response)
				resolve(response)
			})
		}).catch(err => {
			reject(error)
		})
	},
	// 设置菜单
	setMenuList({ commit }, params) {
		commit('SET_MENU_LIST', params)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}