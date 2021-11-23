import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import Cookies from "js-cookie";
// import axiosRetry from "axios-retry";
import {message} from "ant-design-vue";
import layout from "../store/layout";


const xhr = axios.create({
  baseURL: "https://quanquan.asia/web/api/",
  timeout: 3000
})
// axiosRetry(xhr, {
//   retries: 3,
//   retryDelay(retryCount) {
//     return retryCount * 500
//   }
// })

// 将token添加到请求头
xhr.interceptors.request.use((config: AxiosRequestConfig) => {
  let token = Cookies.get("token");
  if (token) {
    config.headers ? config.headers.authorization = 'Bearer ' + token : void (0);
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

xhr.interceptors.response.use((config: AxiosResponse) => {
  return config
}, error => {
  const patt = /timeout of 1ms exceeded/i
  if (patt.test(error)) {
    message.warn("登录凭据失效，请重新登录！")
    layout.mutation.logout()
  }
  return Promise.reject(error)
})
export default xhr
