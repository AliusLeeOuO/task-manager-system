import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Cookies from "js-cookie";

const routerHistory = createWebHistory()


const entry = () => import("../views/entry.vue")
const taskList = () => import("../views/taskList.vue")
const login = () => import("../views/login.vue")
const testpage = () => import("../views/testpage.vue")
const submit = () => import("../views/submit.vue")
const taskkb = () => import("../views/taskListWithkb.vue")
// const newTask = () => import("../views/newTask.vue")
// const login = () => import("../views/login.vue")
const watch = () => import("../views/watch.vue")
// const submitSuccess = () => import("../views/submitSuccess.vue")


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
    component: entry,
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/taskList",
        name: "taskList",
        component: taskList,
        meta: {
          name: "任务列表",
          rol: "2"
        }
      }, {
        path: "/submit",
        name: "submit",
        component: submit,
        meta: {
          name: "提交任务",
          rol: "2"
        }
      }, {
        path: "/watch",
        name: "watch",
        component: watch,
        meta: {
          name: "看板",
          rol: "0"
        }
      },{
        path: "/taskkb",
        name: "taskkb",
        component: taskkb,
        meta: {
          name: "分解",
          rol: "1"
        }
      }, {
        path: "/403",
        name: "403",
        component: () => import("../views/403.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: login,
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
  document.title = `${to.meta.title} | 双高任务管理系统`;
  const role = Cookies.get("token")
  if (!role && to.path !== '/login') {
    next("/login")
  } else {
    if (to.meta.rol === undefined || to.meta.rol === Cookies.get("parentId")) {
      next()
    } else if (to.meta.rol !== Cookies.get("parentId")) {
      next("/403")
    }
  }
})


export default router
