import {reactive} from "vue";
import xhr from "../xhr";
import Cookies from "js-cookie";
import moment from "moment";
import {RouteRecordRaw} from "vue-router";
import {message} from "ant-design-vue";

interface state {
  manageTasks: Array<childrenTask>
  myTasks: Array<childrenTask>
  examineList: Array<examine>
  navList: RouteRecordRaw[]
  notice: notice[]
}

interface childrenTask {
  key: string
  task: string
  schedule?: number
  status?: string | number
  isChildren?: boolean
  endTime: string
  children?: childrenTask[]
}

interface examine {
  key: string
  status: number
  taskName: string
  createdAt: string
  updatedAt: string
}

interface notice {
  id: string
  content: string
  time: string
  sender: { name: string; id: string }
  notifier: { name: string; id: string }[]
}

const preLoad = {
  state: reactive<state>({
    manageTasks: [],
    myTasks: [],
    examineList: [],
    navList: [],
    notice: []
  }),
  mutation: {
    refreshNotice(force?: boolean) {
      if (preLoad.state.notice.length === 0 || force) {
        xhr.get(`notice/pageNoticeList/${Cookies.get("id")}`, {
          params: {
            pagenum: 0,
            pagesize: 99999999999
          }
        }).then(({data}) => {
          if (data.status === 200) {
            console.log(data)
            for (let i in data.data.notices) {
              let notifier = []
              for (let index in data.data.notices[i].notifier) {
                notifier.push({
                  id: data.data.notices[i].notifier[index]._id,
                  name: data.data.notices[i].notifier[index].name
                })
              }
              preLoad.state.notice.push({
                id: data.data.notices[i]._id,
                content: data.data.notices[i].tips,
                time: data.data.notices[i].updatedAt,
                notifier: notifier,
                sender: {
                  id: data.data.notices[i].userId._id,
                  name: data.data.notices[i].userId.name
                }
              })
            }
            console.log(preLoad.state.notice)
          }
        }).catch(error => {
          console.warn(error)
          if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            message.error("响应错误")
          } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            message.error("服务端数据请求失败")
            console.log(error.request);
          } else {
            // 发送请求时出了点问题
            message.error("请求失败，致命错误")
            console.log('Error', error.message);
          }
        })
      }
    }
    /*
    refreshExamine (force?: boolean) {
      if (preLoad.state.examineList.length === 0 || force) {
        xhr.get(`examine/taskAudit/${Cookies.get("id")}`).then(({data}) => {
          console.log(data)
          preLoad.state.examineList.splice(0,preLoad.state.examineList.length)
          for (let i in data.data) {
            preLoad.state.examineList.push({
              key: data.data[i]._id,
              status: data.data[i].status,
              taskName: data.data[i].taskname,
              createdAt: moment(data.data[i].createdAt).format("YYYY年MM月DD日 HH:mm:ss"),
              updatedAt: moment(data.data[i].updatedAt).format("YYYY年MM月DD日 HH:mm:ss")
            })
          }
        }).catch(err => {
          throw err
        })
      }
    }
    */
  }
}
export default preLoad
