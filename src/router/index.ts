import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
const routerHistory = createWebHistory()


const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "",
  //   redirect: "/index"
  // },
  // {
  //   path: "/index",
  //   name: "index",
  //   component: MainTemp
  // }
]


const router = createRouter({
  history: routerHistory,
  routes
})


export default router
