<template>
  <a-card title="在当前任务下新建任务">

    <div id="form">
      <a-form :label-col="labelCol" :rules="rules" @submit="submit">
        <a-form-item ref="fatherTaskName" label="任务名称">
          <a-input placeholder="请输入任务名称" v-model:value="formItem.taskname"/>
        </a-form-item>
        <a-form-item ref="describe" label="任务描述">
          <a-input placeholder="请输入任务描述" v-model:value="formItem.describe"/>
        </a-form-item>
        <a-form-item ref="endtime" label="结束时间">
          <a-date-picker valueFormat="x" show-time placeholder="结束时间" v-model:value="formItem.endtime"/>
        </a-form-item>
        <a-form-item ref="taskUser" label="负责人">
          <a-checkbox-group v-model:value="formItem.taskUser">
            <a-checkbox :value="item.value" v-for="(item, index) in personList" :key="item.value">{{ item.label }}</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">提交</a-button>
          <span style="margin-left: 10px;"></span>
          <a-button @click="backToIndex">返回首页</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import preLoad from "../../store/preLoad";
import network from "../../network";

const route = useRoute()
const router = useRouter()
const taskid = route.params.taskid



const labelCol = {
  style: {
    width: "100px"
  }
}
const rules = {}


interface formItem {
  taskname: string,
  describe: string,
  endtime: string,
  taskUser: any
}
let formItem = reactive<formItem>({
  taskname: "",
  describe: "",
  endtime: "",
  taskUser: []
})


let personList = preLoad.state.personList
if (personList.length === 0) {
  network.post("https://quanquan.asia/web/api/dean/position").then(config => {
    let list = config.data.data
    for (let i = 0; i < list.length; i++) {
      personList.push({
        value: list[i]._id,
        label: list[i].name
      })
    }
  })
}
console.log(preLoad.state.personList)
const backToIndex = () => {
  router.push("/")
}

const submit = () => {
  console.log(formItem)
}

</script>

<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
