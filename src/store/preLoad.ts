import { reactive } from "vue";
// import Cookies from 'js-cookie'
interface state {
  personList: Array<personList>
  allTasks: Array<childrenTask>
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
const preLoad = {
  state: reactive<state>({
    personList: [],
    allTasks: []
  })
}
export default preLoad
