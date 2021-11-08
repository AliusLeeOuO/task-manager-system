import {RouteRecordRaw} from "vue-router"
// dean
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
      rol: "0",
      hide: true
    }
  },{
    path: "/newTask",
    name: "newTask",
    component: () => import("../views/dean/newTask.vue"),
    meta: {
      name: "新建任务",
      rol: "0",
      hide: true
    }
  },{
    path: "/modifyTask",
    name: "modifyTask",
    component: () => import("../views/dean/modifyTask.vue"),
    meta: {
      name: "更新任务",
      rol: "0",
      hide: true
    }
  },{
    path: "/charts",
    name: "charts",
    component: () => import("../components/public/barCharts.vue"),
    meta: {
      name: "概览",
      rol: "0"
    }
  }
]
// major
const per1: Array<RouteRecordRaw> = [
  {
    path: "/major",
    name: "major",
    component: () => import("../views/major/major.vue"),
    meta: {
      name: "首页",
      rol: "1"
    }
  },{
    path: "/majorShowTask",
    name: "majorShowTask",
    component: () => import("../views/major/majorShowTask.vue"),
    meta: {
      name: "查看任务",
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
