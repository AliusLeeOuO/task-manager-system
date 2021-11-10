import {RouteRecordRaw} from "vue-router"

const publicRoute: Array<RouteRecordRaw> = [
  {
    path: "/403",
    name: "403",
    component: () => import("../views/public/403.vue")
  }, {
    path: "/success",
    name: "success",
    component: () => import("../views/success.vue")
  }, {
    path: "/showTask/:taskid",
    name: "showTask",
    component: () => import("../views/dean/showTask.vue"),
    meta: {
      name: "显示任务",
      hide: true
    }
  }, {
    path: "/modifyTask/:taskid",
    name: "modifyTask",
    component: () => import("../views/dean/modifyTask.vue"),
    meta: {
      name: "更新任务",
      hide: true
    }
  }, {
    path: "/addChildTask/:taskid",
    name: "addChildTask",
    component: () => import("../views/dean/addChildTask.vue"),
    meta: {
      name: "新建子任务",
      hide: true
    }
  }
]
export default publicRoute
