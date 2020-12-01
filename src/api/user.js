import { axiosPost, axiosGet } from '@/utils/request'
//登录
export const loginByUsername = data => axiosPost('/dealLogin.action', data)
export const fetchPublicKey = data => axiosPost('/getPublicKey', data)