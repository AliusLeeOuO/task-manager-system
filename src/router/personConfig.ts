import {RouteRecordRaw} from "vue-router"
// 院长
const per0: Array<RouteRecordRaw> = [
  {
    path: "/dean",
    name: "dean",
    component: () => import("../views/dean/dean.vue"),
    meta: {
      name: "首页",
      rol: "0"
    }
  },{
    path: "/showTask",
    name: "showTask",
    component: () => import("../views/dean/showTask.vue"),
    meta: {
      name: "显示任务",
      rol: "0"
    }
  },
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
