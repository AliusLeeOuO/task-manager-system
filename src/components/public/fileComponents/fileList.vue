<template>
  <div id="title">
    <span>提交记录</span>
    <a-button type="primary" :disabled="props.file.length === 0" @click="downloadFile">下载全部文件</a-button>
  </div>
  <div id="box">
    <div>
      <file-block
        :id="i._id"
        :created-at="i.createdAt"
        :describe="i.describe"
        :process="i.process"
        :file="i.files"
        :void="i.void"
        v-for="i in reverseList"
        :key="i._id"
        v-if="props.file.length !== 0"
      ></file-block>
      <a-empty :image="simpleImage" v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Empty, message } from 'ant-design-vue';
import FileBlock, { fls } from "./fileBlock.vue"
import xhr from "../../../xhr"
import moment from "moment";
const props = defineProps<{
  id: string
  title: string
  file: fileLists[]
}>()
const reverseList = props.file.reverse()
export interface fileLists {
  describe: string
  createdAt: string
  userId: string
  process: number
  _id: string
  void: boolean
  files: fls[]
}
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE


function downloadFile() {
  xhr.get(`https://quanquan.asia/admin/api/export/download/${props.id}`, {
    responseType: "blob"
  })
    .then(res => {
      let blob = new Blob([res.data])
      let downloadElement = document.createElement('a')
      let href = window.URL.createObjectURL(blob)
      downloadElement.href = href
      downloadElement.download = `数据导出_${props.title}_${moment().format("YYYY/MM/DD")}.zip`
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(href)
    })
    .catch(error => {
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

</script>
<style lang="less" scoped>
#title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;

  span {
    font-size: 18px;
  }
}

#box {
  margin-bottom: 10px;
}
</style>
