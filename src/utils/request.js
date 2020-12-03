import Vue from 'vue'
import axios from 'axios'
import {
	Message
} from 'element-ui'

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API
})

// request interceptor
service.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return response.data
		} else {
			Message({
				message: response.statusText,
				type: 'error',
				duration: 3 * 1000,
				showClose: true
			})
			return Promise.reject(new Error(response.statusText || 'Error'))
		}
	},
	error => {
		return Promise.reject(error)
	}
)
/**
 * 封装get请求
 * @param url 后面拼接时间戳用来清除get请求缓存
 * @param params
 * @returns {Promise}
 */
export function axiosGet(url, params = {}) {
	return new Promise((resolve, reject) => {
		service.get(url + '?' + new Date().getTime(), {
			params: params
		}).then(response => {
			resolve(response)
		}).catch(err => {
			reject(err)
		})
	})
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @param contentType
 * @returns {Promise}
 */
export function axiosPost(url, data = {}, contentType = 'application/x-www-form-urlencoded') {
	return new Promise((resolve, reject) => {
		service({
			url,
			method: 'post',
			data,
			headers: {
				'Content-Type': contentType
			}
		}).then(response => {
			resolve(response)
		}).catch(err => {
			reject(err)
		})
	})
}
/**
 * 封装现在文件请求
 * @param url
 * @param data
 * @param contentType
 * @returns {Promise}
 */
export function axiosDownload(url, data = {}, contentType = 'application/x-www-form-urlencoded') {
	return new Promise((resolve, reject) => {
		service({
			method: 'post',
			url: url,
			data: data,
			headers: {
				'Content-Type': contentType
			},
			responseType: 'blob'
		}).then((res) => {
			const blob = new Blob([res.data])
			const fileName = res.headers['content-disposition'].split('=')[1]
			if ('download' in document.createElement('a')) { // 非IE下载
				const elink = document.createElement('a')
				elink.download = fileName
				elink.style.display = 'none'
				elink.href = URL.createObjectURL(blob)
				document.body.appendChild(elink)
				elink.click()
				URL.revokeObjectURL(elink.href) // 释放URL 对象
				document.body.removeChild(elink)
			} else { // IE10+下载
				navigator.msSaveBlob(blob, fileName)
			}
			resolve(res)
		}).catch(error => {
			console.log(error)
			reject(error)
		})
	})
}

export function axiosJsonp(url, data) {
	return new Promise((resolve, reject) => {
		if (!url) {
			throw new Error('请传入url')
			reject('请传入url')
		} else {
			const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
			window[callback] = (res) => {
				resolve(res)
				headEle.removeChild(jsonpScript)
				delete window[callback]
			}
			let paramsStr = ''
			const jsonpScript = document.createElement('script')
			jsonpScript.setAttribute('type', 'text/javascript')
			jsonpScript.onerror = reject
			const headEle = document.getElementsByTagName('head')[0]
			if (data) {
				const timeStr = new Date().getTime().toString()
				for (let key in data) {
					paramsStr += `&${key}=${encodeURIComponent(data[key])}`
				}
			}
			jsonpScript.src = `${url}?callback=${callback}${paramsStr}`;
			headEle.appendChild(jsonpScript)
		}
	})
}
