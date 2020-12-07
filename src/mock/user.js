import Mock from 'mockjs'
const Random = Mock.Random

const userInfo = () => ({
	userId: Random.id(),
	userImg: Random.dataImage('200x160', '这是图片中的文本'),
	userNmae: Random.cname()
})
const menuList = () => [
	{ 
		id: '1',
		name: 'User',
		menuKey: 'User',
		path: '/user',
		children: [
			{
				id: '1-1',
				name: 'UserInfo',
				menuKey: 'UserInfo',
				path: 'info',
			}
		]
	}
] 
export default [{
	url: '/login',
	type: 'post',
	response: userInfo
},{
	url: '/menu/list',
	type: 'post',
	response: userInfo
}]
