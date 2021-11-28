import { RouteRecordRaw } from "vue-router";
const publicRoute: Array<RouteRecordRaw> = [
  {
    path: "/403",
    name: "403",
    component: () => import("../views/public/403.vue"),
    meta: {
      name: "403",
      hide: true,
    },
  },
  {
    path: "/success",
    name: "success",
    component: () => import("../views/public/success.vue"),
    meta: {
      name: "403",
      hide: true,
    },
  },
  {
    path: "/showTask/:taskid",
    name: "showTask",
    component: () => import("../views/public/showTask.vue"),
    meta: {
      name: "显示任务",
      hide: true,
    },
  },
  {
    path: "/modifyTask/:taskid",
    name: "modifyTask",
    component: () => import("../views/public/modifyTask.vue"),
    meta: {
      name: "更新任务",
      hide: true,
    },
  },
  {
    path: "/addChildTask/:taskid",
    name: "addChildTask",
    component: () => import("../views/public/addChildTask.vue"),
    meta: {
      name: "新建子任务",
      hide: true,
    },
  },
  {
    path: "/submit/:taskid",
    name: "submit",
    component: () => import("../views/public/submit.vue"),
    meta: {
      name: "提交进度",
      hide: true,
    },
  },{
    path: "/notice",
    name: "notice",
    component: () => import("../views/public/notice/notice.vue"),
    meta: {
      name: "通知",
      hide: true
    },
    children: [
      {
        path: "/notice",
        redirect: '/notice/myNotice'
      },
      {
        path: '/notice/myNotice',
        name: "myNotice",
        component: () => import("../views/public/notice/noticeList.vue"),
        meta: {
          name: "我的通知",
          hide: true
        },
      },
      {
        path: '/notice/sendNotice',
        name: "sendNotice",
        component: () => import("../views/public/notice/sendNotice.vue"),
        meta: {
          name: "发送通知",
          hide: true
        },
      }
    ]
  },
  {
    path: "/showOnlineFile",
    name: "showOnlineFile",
    component: () => import("../views/public/showOnlineFile.vue"),
    meta: {
      name: "查看在线文件",
      hide: true,
    },
  },
];
export default publicRoute;
