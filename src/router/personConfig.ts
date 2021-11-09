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
  }, {
    path: "/newTask",
    name: "newTask",
    component: () => import("../views/dean/newTask.vue"),
    meta: {
      name: "新建任务",
      rol: "0",
      hide: true
    }
  }, {
    path: "/modifyTask",
    name: "modifyTask",
    component: () => import("../views/dean/modifyTask.vue"),
    meta: {
      name: "更新任务",
      rol: "0",
      hide: true
    }
  },{
    path: "/addChildTask/:taskid",
    name: "addChildTask",
    component: () => import("../views/dean/addChildTask.vue"),
    meta: {
      name: "新建子任务",
      rol: "0",
      hide: true
    }
  }, {
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
      name: "我的任务",
      rol: "1"
    }
  }, {
    path: "/creatorTask",
    name: "creatorTask",
    component: () => import("../views/major/creatorTask.vue"),
    meta: {
      name: "我创建的任务",
      rol: "1"
    }
  }
]
// teacher
const per2: Array<RouteRecordRaw> = [
  {
    path: "/teacher",
    name: "teacher",
    component: () => import("../views/teacher/teacher.vue"),
    meta: {
      name: "我的任务",
      rol: "2"
    }
  }, {
    path: "/submit",
    name: "submit",
    component: () => import("../views/submit.vue"),
    meta: {
      name: "提交任务",
      rol: "2",
      hide: true
    }
  }
]
export {per0, per1, per2}
