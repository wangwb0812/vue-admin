import Mock from 'mockjs'
const Random = Mock.Random

var userInfo = () => ({
	userId: Random.id(),
	userImg: Random.dataImage('200x160', '这是图片中的文本'),
	userNmae: Random.cname()
})

export default [{
	url: '/login',
	type: 'post',
	response: userInfo
}]
