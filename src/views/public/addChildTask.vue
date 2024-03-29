<template>
  <a-card title="新建子任务">
    <div id="form">
      <h3>在 {{ route.query.taskName }} 下新建子任务</h3>
      <a-form
        :label-col="labelCol"
        :rules="rules"
        :model="formItem"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item ref="taskname" name="taskname" label="任务名称">
          <a-input placeholder="请输入任务名称" v-model:value="formItem.taskname" />
        </a-form-item>
        <a-form-item ref="describe" name="describe" label="任务描述">
          <a-input placeholder="请输入任务描述" v-model:value="formItem.describe" />
        </a-form-item>
        <a-form-item ref="endtime" name="endtime" label="结束时间">
          <a-date-picker
            valueFormat="x"
            show-time
            placeholder="结束时间"
            v-model:value="formItem.endtime"
          />
        </a-form-item>
        <a-form-item ref="taskUser" name="taskUser" label="负责人">
          <a-checkbox-group v-model:value="formItem.taskUser">
            <a-row>
              <a-col v-for="item in personList" :key="item.value">
                <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              </a-col>
            </a-row>
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
import { useRoute, useRouter } from "vue-router";
import { reactive, UnwrapRef } from "vue";
import xhr from "../../xhr";
import { message } from "ant-design-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import Cookies from "js-cookie";

const route = useRoute()
const router = useRouter()
const taskid = route.params.taskid
const loginType = Cookies.get('parentId')

const labelCol = {
  style: {
    width: "100px"
  }
}

interface formItems {
  taskname: string,
  describe: string,
  endtime: number | null,
  taskUser: string[]
}

let formItem: UnwrapRef<formItems> = reactive({
  taskname: "",
  describe: "",
  endtime: null,
  taskUser: []
})

const validatorTaskUser = async function () {
  if (formItem.taskUser.length === 0) {
    return Promise.reject("请选择负责人")
  }
  return Promise.resolve()
}

const rules = {
  taskname: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
  describe: [{ required: true, message: "请输入任务描述", trigger: "blur" }],
  endtime: [{ required: true, message: "请选择结束时间", trigger: "blur" }],
  taskUser: [{ required: true, validator: validatorTaskUser, trigger: "change" }]
}

interface personList {
  value: string
  label: string
}

let api = ""
if (loginType === "0") {
  api = "dean/position"
} else if (loginType === "1" || loginType === "2") {
  api = "major/position"
}

let personList = reactive<personList[]>([])
xhr.post(api).then(config => {
  let list = config.data.data
  for (let i = 0; i < list.length; i++) {
    personList.push({
      value: list[i]._id,
      label: list[i].name
    })
  }
})

const backToIndex = () => {
  router.push("/")
}

// 验证成功的回调
const handleFinish = (values: formItems) => {
  xhr.post(`major/submitTask`, {
    userId: Cookies.get("id"),
    taskname: values.taskname,
    parentId: taskid,
    creator: Cookies.get("id"),
    worker: values.taskUser,
    describe: values.describe,
    endtime: values.endtime
  })
    .then(({ data }) => {
      if (data.status === 200) {
        router.push({
          path: "/success",
          query: {
            type: "新建子任务",
            title: "新建子任务成功！",
            subtitle: `子任务名称：${values.taskname}，结束时间：${values.endtime ? values.endtime : "未设置"}。`
          }
        })
      }
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
  console.log("values", values, formItem);
};
const handleFinishFailed = (errors: ValidateErrorEntity<formItems>) => {
  console.log("errors", errors);
};


</script>

<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
