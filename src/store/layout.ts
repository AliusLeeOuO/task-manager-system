import {reactive} from "vue"

import Router from "../router"
import Cookies from "js-cookie";
import preLoad from "../store/preLoad";
import {message} from "ant-design-vue";

interface state {
  isLogin: boolean
  loginError: string | null
}

const layout = {
  state: reactive<state>({
    isLogin: false,
    loginError: null
  }),
  mutation: reactive({
    logout() {
      Router.replace("/login").then(config => {
        message.info("注销成功")
      })
      Cookies.remove('token')
      Cookies.remove('user')
      Cookies.remove('parentId')
      Cookies.remove('id')
      preLoad.state.personList = preLoad.state.personList.splice(0, preLoad.state.personList.length)
      preLoad.state.manageTasks = preLoad.state.manageTasks.splice(0, preLoad.state.manageTasks.length)
      preLoad.state.myTasks = preLoad.state.myTasks.splice(0, preLoad.state.myTasks.length)
    }
  })
}
export default layout
