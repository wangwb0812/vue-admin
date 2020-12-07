import Layout from '@/views/Layout'

const user = {
	path: '/user',
	name: 'User',
	component: Layout,
	children: [{
			path: 'info',
			name: 'UserInfo',
			component: () => import('@/views/User/Info'),
			meta: {
				title: '用户信息',
				menuIcon: 'el-icon-setting'
			}
		},
		{
			path: 'resetPsd',
			name: 'UserResetPsd',
			component: () => import('@/views/User/resetPsd'),
			meta: {
				title: '修改密码',
				menuIcon: 'el-icon-setting'
			}
		}
	]
}

export default user
