import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
const routerHistory = createWebHistory()

const taskList = () => import("../views/taskList.vue")
const submit = () => import("../views/submit.vue")

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
  }
]


const router = createRouter({
  history: routerHistory,
  routes
})


export default router
