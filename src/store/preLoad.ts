import {reactive} from "vue";
import xhr from "../xhr";
import Cookies from "js-cookie";
import moment from "moment";
import {RouteRecordRaw} from "vue-router";

interface state {
  personList: Array<personList>
  manageTasks: Array<childrenTask>
  myTasks: Array<childrenTask>
  examineList: Array<examine>
  navList: RouteRecordRaw[]
}

interface personList {
  label: string,
  value: string
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
const preLoad = {
  state: reactive<state>({
    personList: [],
    manageTasks: [],
    myTasks: [],
    examineList: [],
    navList: []
  }),
  mutation: {
    preLoadPerson(apiPath: string) {
      xhr.post(apiPath).then(({data}) => {
        let list = data.data
        preLoad.state.personList.splice(0,preLoad.state.personList.length)
        for (let i = 0; i < list.length; i++) {
          preLoad.state.personList.push({
            value: list[i]._id,
            label: list[i].name
          })
        }
      })
    },
    refreshExamine (force?: boolean) {
      if (preLoad.state.examineList.length === 0 || force) {
        xhr.get(`examine/taskAudit/${Cookies.get("id")}`).then(({data}) => {
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
  }
}
export default preLoad
