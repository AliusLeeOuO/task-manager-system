import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Cookies from "js-cookie";
import {per0, per1, per2} from "./personConfig";
import publicRoute from "./publicRoute";

const routerHistory = createWebHistory()

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/index",
    meta: {
      title: "首页"
    }
  }, {
    path: "/index",
    name: "index",
    component: () => import("../views/public/entry.vue"),
    meta: {
      title: "首页"
    },
    children: [
      ...per0,
      ...per1,
      ...per2,
      ...publicRoute
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/public/login.vue"),
    meta: {
      title: "登录"
    }
  }
]


const router = createRouter({
  history: routerHistory,
  routes
})

router.beforeEach((to, form, next) => {
  document.title = `${to.meta.name ? to.meta.name : to.meta.title} | 双高任务管理系统`;
  const role = Cookies.get("token")
  if (!role && to.path !== '/login') {
    next("/login")
  } else if (to.meta.rol === undefined || to.meta.rol === Cookies.get("parentId")) {
    next()
  } else if (to.meta.rol !== Cookies.get("parentId")) {
    next("/403")
  }
})


export default router
