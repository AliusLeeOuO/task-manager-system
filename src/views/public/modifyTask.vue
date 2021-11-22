<template>
  <card title="修改任务">
    <div id="form">
      <a-form
        :label-col="labelCol"
        :rules="rules"
        :model="formItem"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item ref="taskname" name="taskname" label="任务名称">
          <a-input placeholder="请输入任务名称" v-model:value="formItem.taskname"/>
        </a-form-item>
        <a-form-item ref="describe" name="describe" label="任务描述">
          <a-input placeholder="请输入任务描述" v-model:value="formItem.describe"/>
        </a-form-item>
        <a-form-item ref="endtime" name="endtime" label="结束时间">
          <a-date-picker valueFormat="x" show-time placeholder="结束时间，不设置即不限" v-model:value="formItem.endtime"/>
        </a-form-item>
        <a-form-item ref="taskUser" name="taskUser" label="负责人">
          <a-checkbox-group v-model:value="formItem.taskUser">
            <a-checkbox :value="item.value" v-for="(item, index) in personList" :key="item.value">
              {{ item.label }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">提交</a-button>
          <span style="margin-left: 10px;"></span>
          <a-button @click="backToIndex">返回首页</a-button>
        </a-form-item>
      </a-form>
    </div>
  </card>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {reactive, ref, UnwrapRef} from "vue";
import preLoad from "../../store/preLoad";
import xhr from "../../xhr";
import {message} from "ant-design-vue";
import {ValidateErrorEntity} from "ant-design-vue/es/form/interface";
import Card from "../../components/public/card.vue"
import Cookies from "js-cookie";

const route = useRoute()
const router = useRouter()
const taskid = route.params.taskid


const labelCol = {
  style: {
    width: "100px"
  }
}

interface formItems {
  taskname: string,
  describe: string,
  endtime: string | null,
  taskUser: any
}

let formItem: UnwrapRef<formItems> = reactive({
  taskname: "",
  describe: "",
  endtime: "",
  taskUser: []
})

xhr.get(`major/getTask/${taskid}`).then(({data}) => {
  const task = data.data[0]
  formItem.taskname = task.taskname
  formItem.describe = task.describe
  formItem.endtime = task.endtime
  for (let i in task.worker) {
    formItem.taskUser.push(task.worker[i]._id)
  }
}).catch(error => {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    message.warn("服务端数据请求失败")
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    message.warn("服务端数据请求失败")
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    message.warn("请求失败，致命错误")
    console.log('Error', error.message);
  }
})

const validatorTaskUser = async function () {
  if (formItem.taskUser.length === 0) {
    return Promise.reject("请选择负责人")
  }
  return Promise.resolve()
}

const rules = {
  taskname: [{required: true, message: "请输入任务名称", trigger: "blur"}],
  // describe: [{required: true, message: "请输入任务描述", trigger: "blur"}],
  taskUser: [{required: true, validator: validatorTaskUser, trigger: "change"}]
}


let personList = preLoad.state.personList
if (personList.length === 0) {
  xhr.post("dean/position").then(config => {
    let list = config.data.data
    for (let i = 0; i < list.length; i++) {
      personList.push({
        value: list[i]._id,
        label: list[i].name
      })
    }
  })
}
const backToIndex = () => {
  router.push("/")
}

// 验证成功的回调
const handleFinish = (values: formItems) => {
  xhr.put(`major/updataTask/${taskid}`,{
    userId: Cookies.get("id"),
    taskname: values.taskname,
    worker: values.taskUser,
    describe: values.describe,
    endtime: values.endtime
  })
  .then(({data}) => {
    if (data.status === 200) {
      router.push({
        path: "/success",
        query: {
          type: "更新任务",
          title: "更新任务成功！"
        }
      })
    }
    console.log(data)
  })
  .catch(error => {
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
  console.log("values",values, formItem);
};
const handleFinishFailed = (errors: ValidateErrorEntity<formItems>) => {
  console.log("errors",errors);
};


</script>

<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
