import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
const routerHistory = createWebHistory()

const taskList = () => import("../views/taskList.vue")
const submit = () => import("../views/submit.vue")
const taskkb = () => import("../views/taskListWithkb.vue")
const newTask = () => import("../views/newTask.vue")
const login = () => import("../views/login.vue")
const watch = () => import("../views/watch.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: taskList
  },
  {
    path: "/submit",
    name: "submit",
    component: submit
  },{
    path: "/taskkb",
    name: "taskkb",
    component: taskkb
  },{
    path: "/newTask",
    name: "newTask",
    component: newTask
  },{
    path: "/login",
    name: "login",
    component: login
  },{
    path: "/watch",
    name: "watch",
    component: watch
  }
]




const router = createRouter({
  history: routerHistory,
  routes
})


import layout from "../store/layout";
router.beforeEach(function (to, form, next) {
  if (to.name === "login") {
    layout.changeIsLogin(true)
  }else {
    layout.changeIsLogin(false)
  }
  next()
})






export default router
