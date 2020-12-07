import Mock from 'mockjs'
const Random = Mock.Random

const userInfo = () => ({
	userId: Random.id(),
	userImg: Random.dataImage('200x160', '这是图片中的文本'),
	userNmae: Random.cname()
})
const menuList = () => [{
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
		children: [{
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
export default [{
	url: '/login',
	type: 'post',
	response: userInfo
}, {
	url: '/menu/list',
	type: 'post',
	response: menuList
}]
