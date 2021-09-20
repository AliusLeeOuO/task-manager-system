import { reactive } from "vue";
const layout = {
  state: reactive({
    isLogin: false
  }),
  changeIsLogin(status: boolean): void {
    this.state.isLogin = status
  }
}
export default layout
