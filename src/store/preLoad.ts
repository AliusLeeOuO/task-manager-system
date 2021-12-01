import { reactive } from "vue";
import xhr from "../xhr";
import Cookies from "js-cookie";
import { RouteRecordRaw } from "vue-router";
import { message } from "ant-design-vue";

interface state {
  manageTasks: Array<childrenTask>;
  myTasks: Array<childrenTask>;
  examineList: Array<examine>;
  navList: RouteRecordRaw[];
  notice: notice[];
}

interface childrenTask {
  key: string;
  task: string;
  schedule?: number;
  status?: string | number;
  isChildren?: boolean;
  endTime: string;
  children?: childrenTask[];
}

interface examine {
  key: string;
  status: number;
  taskName: string;
  createdAt: string;
  updatedAt: string;
}

interface notice {
  id: string;
  content: string;
  time: string;
  sender: { name: string; id: string };
  notifier: { name: string; id: string }[];
}

const preLoad = {
  state: reactive<state>({
    manageTasks: [],
    myTasks: [],
    examineList: [],
    navList: [],
    notice: [],
  }),
  mutation: {
    refreshNotice: function (force?: boolean) {
      if (preLoad.state.notice.length === 0 || force) {
        preLoad.state.notice.splice(0, preLoad.state.notice.length);
        xhr
          .get(`notice/pageNoticeList/${Cookies.get("id")}`, {
            params: {
              pagenum: 0,
              pagesize: 99999999999,
            },
          })
          .then(({ data }) => {
            if (data.status === 200) {
              for (let i in data.data.notices) {
                let notifier = [];
                for (
                  let index = 0;
                  index < data.data.notices[i].notifier.length;
                  index++
                ) {
                  notifier.push({
                    id: data.data.notices[i].notifier[index]._id,
                    name: data.data.notices[i].notifier[index].name,
                  });
                }
                if (data.data.notices[i].userId) {
                  preLoad.state.notice.push({
                    id: data.data.notices[i]._id,
                    content: data.data.notices[i].tips,
                    time: data.data.notices[i].updatedAt,
                    notifier: notifier,
                    sender: {
                      id: data.data.notices[i].userId._id,
                      name: data.data.notices[i].userId.name,
                    },
                  });
                } else {
                  preLoad.state.notice.push({
                    id: data.data.notices[i]._id,
                    content: data.data.notices[i].tips,
                    time: data.data.notices[i].updatedAt,
                    notifier: notifier,
                    sender: {
                      id: "00",
                      name: "暂无",
                    },
                  });
                }
              }
              // console.log(preLoad.state.notice)
            }
          })
          .catch((error) => {
            console.warn(error);
            if (error.response) {
              // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
              message.error("响应错误");
            } else if (error.request) {
              // 请求已经成功发起，但没有收到响应
              message.error("服务端数据请求失败");
              console.log(error.request);
            } else {
              // 发送请求时出了点问题
              message.error("请求失败，致命错误");
              console.log("Error", error.message);
            }
          });
      }
    },
  },
};
export default preLoad;
