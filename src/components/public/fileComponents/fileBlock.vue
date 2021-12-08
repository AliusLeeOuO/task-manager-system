<template>
  <div class="file-block">
    <div class="file-content">
      <p class="file-title">
        提交描述：{{ props.describe }} 提交时间：{{
          moment(props.createdAt).format("YYYY年MM月DD日 HH:mm:ss")
        }}
      </p>
      <a-progress :percent="props.process" v-if="props.process"/>
      <span v-else>本次提交未提交任务进度</span>
      <span v-if="props.ret">
        <a-button danger block v-if="ret" @click="returnAudit">打回</a-button>
        <a-button danger block disabled v-else>已被打回</a-button>
      </span>
    </div>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #action="{ record }">
        <div class="actions">
          <a :href="record.link" :download="record.link">下载</a>
          <a
            href="javascript:void(0);"
            v-if="checkSupportOnline(record.name)"
            @click="toOnline(record.link, checkSupportOnline(record.name))"
          >在线查看</a>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref, computed} from "vue";
import {useRouter} from "vue-router";
import moment from "moment";
import xhr from "../../../xhr"
import Cookies from "js-cookie";
import {message} from "ant-design-vue";

const props = defineProps<{
  // id
  id: string
  // 描述
  describe: string
  // 进度
  process?: number
  // 是否作废
  void: boolean
  // 提交时间
  createdAt: string
  // 文件
  file: fls[]
  // 是否允许打回
  ret: boolean
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
  filename = filename.toLowerCase()
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


// 打回
const returned = ref<boolean>(false)
const ret = computed(() => {
  return !!(props.void || returned);
})

function returnAudit() {
  message.loading("正在请求打回...")
  xhr.put(`examine/returnAudit/${props.id}`, {
    userId: Cookies.get("id")
  })
    .then(({data}) => {
      if (data.status === 200) {
        returned.value = true
        message.success("打回成功！")
      } else {
        message.info(data.msg)
      }
    })
    .catch(error => {
      message.error("打回失败！")
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
.file-content {
  margin: 10px 0;
  display: grid;
  grid-template-columns: 20fr 4fr auto;
  align-items: center;
  grid-gap: 10px;
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
