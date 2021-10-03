import { reactive } from "vue";
import Cookies from 'js-cookie'
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
  changeIsLogin(): void {
    this.state.isLogin = !!Cookies.get("token")
  }
}
export default layout
