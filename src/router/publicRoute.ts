import {RouteRecordRaw} from "vue-router"

const publicRoute: Array<RouteRecordRaw> = [
  {
    path: "/403",
    name: "403",
    component: () => import("../views/public/403.vue")
  },
  {
    path: "/success",
    name: "success",
    component: () => import("../views/success.vue")
  },{
    path: "/showTask",
    name: "showTask",
    component: () => import("../views/dean/showTask.vue"),
    meta: {
      name: "显示任务",
      hide: true
    }
  },
]
export default publicRoute
