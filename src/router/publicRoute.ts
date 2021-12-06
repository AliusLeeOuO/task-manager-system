import {RouteRecordRaw} from "vue-router";

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
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("../views/public/notice/notice.vue"),
    meta: {
      name: "通知",
      hide: true,
    },
    children: [
      {
        path: "/notice",
        redirect: "/notice/myNotice",
      },
      {
        path: "/notice/myNotice",
        name: "myNotice",
        component: () => import("../views/public/notice/noticeList.vue"),
        meta: {
          name: "我的通知",
          hide: true,
        },
      },
      {
        path: "/notice/sendNotice",
        name: "sendNotice",
        component: () => import("../views/public/notice/sendNotice.vue"),
        meta: {
          name: "发送通知",
          hide: true,
        },
      },
    ],
  },
  {
    path: "/showOnlineFile",
    name: "showOnlineFile",
    component: () => import("../views/public/showOnlineFile.vue"),
    meta: {
      name: "查看在线文件",
      hide: true,
    },
  }, {
    path: "/myProfile",
    name: "myProfile",
    component: () => import("../views/public/myProfile.vue"),
    meta: {
      name: "我的资料",
      hide: true,
    },
    children: [
      {
        path: "/myProfile",
        redirect: "/myProfile/view"
      },
      {
        path: "/myProfile/view",
        name: "viewProfile",
        component: () => import("../components/profile/viewProfile.vue")
      }, {
        path: "/myProfile/change",
        name: "changeProfile",
        component: () => import("../components/profile/changeProfile.vue")
      }, {
        path: "/myProfile/changePassword",
        name: "changePassword",
        component: () => import("../components/profile/changePassword.vue")
      },
    ]
  },
  {
    path: "/openSourceLicense",
    name: "openSourceLicense",
    component: () => import("../components/public/openSourceLicense/openSourceLicense.vue"),
    meta: {
      name: "开源软件使用许可",
      hide: true,
    },
  }
];
export default publicRoute;
