import Vue from 'vue'
import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import router from '@/router'
import qs from 'qs'



// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method === 'post' && 
		  Object.prototype.toString.call(config.data) !== '[object FormData]' && 
		  config.headers['Content-Type'] !== 'application/json') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const headers = response.headers
    // 导出拦截
    if (headers['content-type'] === 'application/octet-stream;charset=utf-8' || headers['content-type'] ===
      'application/vnd.ms-excel;charset=utf-8' || headers['content-type'] === 'application/msword') {
      return response
    }
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      // 400未登录 402没权限 500系统异常
      if (res.code === 400) {
        // to re-login
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })
        store.dispatch('user/resetLoginStatus').then(() => {
          location.reload()
        })
      } else if (res.code === 401) {
        Message({
          message: '登录超时',
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })
        store.dispatch('user/resetLoginStatus').then(() => {
          location.reload()
        })
      } else if (res.code === 402) {
        MessageBox({
          message: '无访问权限',
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.message === 'cancel') {
      return Promise.reject(error)
    }
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
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
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
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
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
