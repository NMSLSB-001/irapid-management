import { message } from 'ant-design-vue'
export default function ({ store, redirect, app: { $axios } }) {
  // 后端接口地址
  $axios.defaults.baseURL = process.env.API_URL

  // // Request拦截器：设置Token
  // $axios.onRequest((config) => {
  //   // 使用Vuex存储Token，并做持久化处理
  //   config.headers.Authorization = 'Bearer' + localStorage.getItem('token')
  // })
  // Error拦截器：出现错误的时候被调用，根据状态码做对应判断并显示全局message
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      case 400:
        message.error('请求错误')
        break
      // 未登录
      case 401:
        message.error('Token过期')
        localStorage.clear()
        break
      case 403:
        message.error('拒绝访问')
        break
      case 404:
        message.error(`请求地址出错: ${error.response.config.url}`)
        break
      case 408:
        message.error('请求超时')
        break
      case 500:
        message.error('服务器内部错误')
        break
      case 501:
        message.error('服务未实现')
        break
      case 502:
        message.error('网关错误')
        break
      case 503:
        message.error('服务不可用')
        break
      case 504:
        message.error('网关超时')
        break
      case 505:
        message.error('HTTP版本不受支持')
        break
      default:
        break
    }
  })
}
