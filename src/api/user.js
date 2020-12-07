import { axiosPost, axiosGet } from '@/utils/request'
// 登录
export const login = data => axiosPost('/login', data)
// 获取用户菜单
export const fetchUserMenuList = data => axiosPost('/menu/list', data)