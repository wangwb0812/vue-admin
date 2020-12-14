import Layout from '@/views/Layout'

const system = {
	path: '/system',
	name: 'System',
	component: Layout,
	children: [{
			path: 'user',
			name: 'SystemUser',
			component: () => import('@/views/System/User'),
			meta: {
				title: '用户管理',
				menuIcon: 'el-icon-setting'
			}
		},
		{
			path: 'role',
			name: 'SystemRole',
			component: () => import('@/views/System/Role'),
			meta: {
				title: '角色管理',
				menuIcon: 'el-icon-s-custom'
			}
		}
	]
}

export default system