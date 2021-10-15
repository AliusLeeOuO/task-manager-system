import axios from "axios";
import Cookies from "js-cookie";
import axiosRetry from "axios-retry";


const xhr = axios.create({
  baseURL: "https://quanquan.asia/web/api/",
  timeout: 3000
})
axiosRetry(xhr,{
  retries: 3,
  retryDelay(retryCount) {
    return retryCount * 500
  }
})

// 将token添加到请求头
xhr.interceptors.request.use(config => {
  let token = Cookies.get("token");
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default xhr
