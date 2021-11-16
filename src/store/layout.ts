import {reactive} from "vue";
// import Cookies from 'js-cookie'

import Router from "../router"
import Cookies from "js-cookie";
import preLoad from "../store/preLoad";

interface state {
  isLogin: boolean
  loginError: string | null
  token: string | null
}

const layout = {
  state: reactive<state>({
    isLogin: false,
    loginError: null,
    token: null
  }),
  mutation: reactive({
    logout() {
      Router.replace("/login")
      Cookies.remove('token')
      Cookies.remove('user')
      Cookies.remove('parentId')
      Cookies.remove('id')
      preLoad.state.personList = []
      preLoad.state.allTasks = []
    }
  })
}
export default layout
