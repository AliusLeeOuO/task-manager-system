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
        <div class="actions">
          <a :href="record.link" :download="record.link">下载</a>
          <a href="javascript:void(0);" v-if="checkSupportOnline(record.name)"
             @click="toOnline(record.link,checkSupportOnline(record.name))">在线查看</a>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import moment from "moment";
import layout from "../../../store/layout";

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
    width: "15%",
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
  ++key
  dataSource.push({
    key: key,
    name: props.file[i].originalname,
    link: `https://quanquan.asia/${props.file[i].path}-${props.file[i].originalname}`
  })
}
const supportOnline = {
  office: [
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx"
  ],
  photo: [
    "gif",
    "png",
    "jpg",
    "jpeg"
  ]
}

function checkSupportOnline(filename: string) {
  // office
  for (let i in supportOnline.office) {
    if (filename.indexOf(supportOnline.office[i]) !== -1) {
      return "office"
    }
  }
  //photo
  for (let i in supportOnline.photo) {
    if (filename.indexOf(supportOnline.photo[i]) !== -1) {
      return "photo"
    }
  }
  return false
}

const router = useRouter()

function toOnline(url: string, type: string | boolean) {
  router.push({
    path: "/showOnlineFile",
    query: {
      link: url,
      type: type.toString()
    }
  })
}
</script>
<style lang="less" scoped>
.file-content {
  margin: 10px 0;
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

.actions {
  & > * {
    margin: 0 2px;
  }
}
</style>
