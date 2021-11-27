<template>

  <div id="selects">
    <a-form @finish="handleFinish" ref="formRef" :rules="rules" :model="items" :label-col="{ span: 2 }">
      <a-form-item ref="majorselected" name="majorselected" label="专业带头人">
        <a-checkbox-group v-model:value="items.majorselected" :options="majorselect"/>
      </a-form-item>
      <a-form-item ref="teacherselected" name="teacherselected" label="老师">
        <a-checkbox-group v-model:value="items.teacherselected" :options="teacherselect"/>
      </a-form-item>
      <a-form-item ref="send" name="send" label="发送信息">
        <a-textarea
          v-model:value="items.send"
          placeholder="输入想发送的信息"
          :auto-size="{ minRows: 5, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 2 }">
        <a-button html-type="submit" type="primary">发送</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {RuleObject} from 'ant-design-vue/es/form/interface';
import xhr from "../../../xhr"
import Cookies from "js-cookie";
import {message} from "ant-design-vue";


interface select {
  label: string
  value: string
}

interface items {
  majorselected: select[];
  teacherselected: select[];
  send: string
}

const formRef = ref();
const majorselect = reactive<select[]>([])
const teacherselect = reactive<select[]>([])

const items = reactive<items>({
  majorselected: [],
  teacherselected: [],
  send: ""
})


//获取专头职位
xhr.post(`dean/position`)
  .then(({data}) => {
    for (let i in data.data) {
      majorselect.push({
        label: `${data.data[i].workerNumber}${data.data[i].name}`,
        value: data.data[i]._id
      })
    }
  })
  .catch(error => {
    throw error
  })
xhr.post(`major/position`)
  .then(({data}) => {
    for (let i in data.data) {
      teacherselect.push({
        label: `${data.data[i].workerNumber}${data.data[i].name}`,
        value: data.data[i]._id
      })
    }
  })
  .catch(error => {
    throw error
  })


const resetForm = () => {
  formRef.value.resetFields();
};

let validateselect = async (rule: RuleObject, value: string) => {
  const select = [...items.majorselected, ...items.teacherselected]
  if (select.length === 0) {
    return Promise.reject("请至少选择一个接收人")
  }
  return Promise.resolve()
};
const rules = {
  majorselected: [{validator: validateselect, trigger: "change"}],
  teacherselected: [{validator: validateselect, trigger: "change"}],
  send: [{required: true, message: "请输入消息", trigger: 'blur'}]
}
const handleFinish = (values: items) => {
  let msg = message.loading("正在处理，请勿离开。")

  xhr.post(`notice/chat/${Cookies.get("id")}`,{
    notifier: [...items.majorselected, ...items.teacherselected],
    tips: items.send
  }).then(({data}) => {
    if (data.status === 200) {
      msg.then(()=> message.success("发送信息成功！"), () => {})
      resetForm()
    }
  }).catch(error => {
    throw error
  })
};
</script>
<style lang="less" scoped>
#selects {
  padding: 20px;
}
</style>
