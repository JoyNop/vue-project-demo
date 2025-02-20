import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', // 读取环境变量
  timeout: 10000, // 超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求头中添加 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回 data，避免每次调用都需要 `.data`
    return response.data
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          console.error('未授权，请重新登录')
          localStorage.removeItem('token') // 清除 Token
          window.location.href = '/login' // 跳转到登录页
          break
        case 403:
          console.error('无权限访问')
          break
        case 500:
          console.error('服务器错误，请稍后再试')
          break
        default:
          console.error(data?.message || '请求出错')
      }
    } else {
      console.error('网络异常或请求超时')
    }
    return Promise.reject(error)
  },
)

// **封装 request 方法**
const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const response = await service.request<T>(config)
  return response as T
}

export default request
