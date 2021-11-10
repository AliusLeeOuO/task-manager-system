import { reactive } from "vue";
import network from "../network";
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
  }),
  mutation: {
    preLoadPerson(apiPath: string) {
      network.post(apiPath).then(({data}) => {
        let list = data.data
        preLoad.state.personList = []
        for (let i = 0; i < list.length; i++) {
          preLoad.state.personList.push({
            value: list[i]._id,
            label: list[i].name
          })
        }
      })
    }
  }
}
export default preLoad
