import Mock from 'mockjs'
import user from './user'

const mocks = [
  ...user
]

mocks.forEach(mockItem => {
	Mock.mock(`${process.env.VUE_APP_BASE_API}${mockItem.url}`, mockItem.type || 'get', mockItem.response )
})