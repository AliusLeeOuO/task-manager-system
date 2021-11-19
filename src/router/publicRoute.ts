import {RouteRecordRaw} from "vue-router"
const publicRoute: Array<RouteRecordRaw> = [
  {
    path: "/403",
    name: "403",
    component: () => import("../views/public/403.vue"),
    meta: {
      name: "403",
      hide: true
    }
  }, {
    path: "/success",
    name: "success",
    component: () => import("../views/success.vue"),
    meta: {
      name: "403",
      hide: true
    }
  }, {
    path: "/showTask/:taskid",
    name: "showTask",
    component: () => import("../views/public/showTask.vue"),
    meta: {
      name: "显示任务",
      hide: true
    }
  }, {
    path: "/modifyTask/:taskid",
    name: "modifyTask",
    component: () => import("../views/public/modifyTask.vue"),
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
  }, {
    path: "/examineList",
    name: "examine",
    component: () => import("../views/public/examine.vue"),
    meta: {
      name: "审核列表"
    }
  }, {
    path: "/examineOnce/:taskid",
    name: "examineOnce",
    component: () => import("../views/public/examineOnce.vue"),
    meta: {
      name: "审核任务",
      hide: true
    }
  }
]
export default publicRoute
