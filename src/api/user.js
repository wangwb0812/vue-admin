import { axiosPost, axiosGet } from '@/utils/request'
//登录
export const login = data => axiosPost('/login', data)
