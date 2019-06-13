import moment from 'moment'

moment.locale('zh-cn')
export function calendar(str) {
  return moment(str).utcOffset(+8).calendar();
}
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  console.log(year)
  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  console.log(t1, t2)
  return `${t1} ${t2}`
}
export function getQuery() {
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options
  return options
}
export function videoUrlConvert(url) {
  let base = 'https://video.mcust.cn/'
  try {
    return url.replace('http://newoss.maiziedu.com/', base)
  }catch(e) {
    console.log(e)
  }
  // let arr = url.split('/')
  // return base + arr[arr.length - 1]
}
export default {
  calendar,
  formatTime,
  getQuery,
  videoUrlConvert
}
