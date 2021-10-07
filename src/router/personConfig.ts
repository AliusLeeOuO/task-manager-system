import {RouteRecordRaw} from "vue-router"

const per0: Array<RouteRecordRaw> = [
  {
    path: "/watch",
    name: "watch",
    component: () => import("../views/watch.vue"),
    meta: {
      name: "看板",
      rol: "0"
    }
  }
]
const per1: Array<RouteRecordRaw> = [
  {
    path: "/taskkb",
    name: "taskkb",
    component: () => import("../views/taskListWithkb.vue"),
    meta: {
      name: "分解",
      rol: "1"
    }
  }
]
const per2: Array<RouteRecordRaw> = [
  {
    path: "/taskList",
    name: "taskList",
    component: () => import("../views/taskList.vue"),
    meta: {
      name: "任务列表",
      rol: "2"
    }
  }, {
    path: "/submit",
    name: "submit",
    component: () => import("../views/submit.vue"),
    meta: {
      name: "提交任务",
      rol: "2"
    }
  }
]
export {per0, per1, per2}
