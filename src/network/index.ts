import axios, {AxiosRequestConfig} from "axios";
import Cookies from "js-cookie";
import axiosRetry from "axios-retry";


const xhr = axios.create({
  baseURL: "https://quanquan.asia/web/api/",
  timeout: 3000
})
axiosRetry(xhr, {
  retries: 3,
  retryDelay(retryCount) {
    return retryCount * 500
  }
})

// 将token添加到请求头
xhr.interceptors.request.use((config: AxiosRequestConfig) => {
  let token = Cookies.get("token");
  if (token) {
    config.headers?config.headers.authorization = 'Bearer ' + token : void(0);
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default xhr
