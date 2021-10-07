import axios from "axios";

const xhr = axios.create({
  baseURL: "https://quanquan.asia/web/api/",
  timeout: 3000
})

export default xhr
