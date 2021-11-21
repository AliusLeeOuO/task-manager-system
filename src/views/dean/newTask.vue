<template>
  <a-card title="新建 任务/子任务">
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
            <a-checkbox :value="item.value" v-for="(item, index) in personList">{{ item.label }}</a-checkbox>
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
import {reactive} from 'vue';
import preLoad from "../../store/preLoad";
import network from '../../xhr/index'
import Cookies from "js-cookie";
import {useRouter} from "vue-router"
import {message} from "ant-design-vue"

const router = useRouter()

interface formItem {
  taskname: string;
  describe: string;
  endtime: string;
  taskUser: any;
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


const labelCol = {
  style: {
    width: "100px"
  }
}
const rules = {}


const submit = (event: SubmitEvent) => {
  message.info("正在处理，请勿离开。")
  network.post("dean/createTask", {
    task: {
      taskname: formItem.taskname,
      creator: Cookies.get("id"),
      worker: formItem.taskUser,
      describe: formItem.describe,
      endtime: formItem.endtime
    }
  }).then(config => {
    router.push({
      path: "/success",
      query: {
        type: "创建任务",
        title: "任务创建成功",
        subtitle: `任务名：${formItem.taskname},结束时间：${formItem.endtime}`
      }
    })
  }).catch(error => {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      message.error("表单格式错误")
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

  event.stopPropagation()
}

const backToIndex = () => {
  router.push("/")
}

</script>
<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
