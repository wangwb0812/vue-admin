// set function parseTime,formatTime to filter
import { padZero } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}
export function numberFilter(value) {
  if (value >= 100000){
    value = parseInt(Math.round(value / 10000))
    return (+value || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) + 'w'
  } else {
    return (+value || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function dateFilter(date) {
  if (!date || date === 'null') return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  const hours = padZero(d.getHours())
  const minutes = padZero(d.getMinutes())
  const seconds = padZero(d.getSeconds())
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}
/**
 * 时间戳格式化函数
 * @param  {y-m-d h:i:s}  format        格式
 * @param  {int}          timestamp     要格式化的时间 默认为当前时间  毫秒
 * @return {string}                     格式化的时间字符串
 */
export function timestampFormatter(timestamp, format) {
  if (!timestamp || timestamp === 'null') return ''
  var d = ((timestamp) ? new Date(timestamp) : new Date())
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  const hours = padZero(d.getHours())
  const minutes = padZero(d.getMinutes())
  const seconds = padZero(d.getSeconds())
  let str = ''
  switch (format) {
    case 'h:i':
      str = hours + ':' + minutes
      break
    case 'h:i:s':
      str = hours + ':' + minutes + ':' + seconds
      break
    case 'y-m':
      str = year + '-' + month
      break
    case 'y-m-d':
      str = year + '-' + month + '-' + day
      break
    case 'y-m-d h:i':
      str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
      break
    default:
      str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  }
  return str
}

export function dataFormatter(val) {
  if (val && val.trim() !== '') {
    return val
  } else {
    return '无'
  }
}
