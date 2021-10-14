import {RouteRecordRaw} from "vue-router"

const publicRoute: Array<RouteRecordRaw> = [
  {
    path: "/403",
    name: "403",
    component: () => import("../views/403.vue")
  },
  {
    path: "/success",
    name: "success",
    component: () => import("../views/success.vue")
  }
]
export default publicRoute
