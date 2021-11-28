<template>
  <div class="file-block">
    <div class="file-content">
      <p class="file-title">提交描述：{{ props.describe }} 提交时间：{{
          moment(props.createdAt).format("YYYY年MM月DD日 HH:mm:ss")
        }}</p>
      <a-progress :percent="props.process"/>
      <a-button danger block :disabled="!props.void">打回</a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #action="{ record }">
        <a :href="record.link" :download="record.link">下载</a>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from "vue";
import moment from "moment";

const props = defineProps<{
  // 描述
  describe: string
  // 进度
  process: number
  // 是否作废
  void: boolean
  // 提交时间
  createdAt: string
  // 文件
  file: fls[]
}>()

export interface fls {
  destination: string
  encoding: string
  fieldname: string
  filename: string
  mimetype: string
  originalname: string
  path: string
  size: number
}

const columns = reactive([
  {
    title: '文件名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    slots: {customRender: 'action'}
  }

])


interface fileList {
  key: number
  name: string
  link: string
}

const dataSource = reactive<fileList[]>([])
let key = 0
for (let i in props.file) {
  dataSource.push({
    key: key,
    name: props.file[i].originalname,
    link: `https://quanquan.asia/${props.file[i].path}-${props.file[i].originalname}`
  })
}
</script>
<style lang="less" scoped>
.file-content {
  display: grid;
  grid-template-columns: 10fr 2fr auto;
  align-items: center;
  grid-gap: 10px
}

.file-title {
  @height: 34px;
  height: @height;
  line-height: 24px;
  border-radius: 5px;
  background-color: #eee;
  padding: 5px 10px;
  margin: 0;
}
</style>
