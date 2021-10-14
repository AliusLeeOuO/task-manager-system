<template>
  <a-card title="查看任务">

    <div id="form">
      <div v-if="isLoading">
        <a-skeleton :paragraph="{ rows: 6 }" active/>
      </div>
      <div v-else>
        <h2>{{ taskTitle }}</h2>
        <p>任务简介： {{ taskSubTitle }}</p>
        <p>创建人：{{ creator }}</p>
        <p>当前提交：{{ route.query.taskName }}</p>
        <h3>提交的文件</h3>
        <div>
          <File-cpn :href="item.link" :file-title="item.title" v-for="(item, index) in fileList"
                    :key="item.title"></File-cpn>
        </div>
        <a-button @click="back">返回</a-button>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {UploadOutlined} from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";
import network from "../../network/index"
import FileCpn from "../../components/fileData.vue"

const route = useRoute()
const router = useRouter()

let taskTitle = ref<string>("")
let taskSubTitle = ref<string>("")
let creator = ref<string>("")

interface fileList {
  title: string
  link: string
}

let isLoading = ref<boolean>(true)

let fileList = reactive<fileList[]>([])

network.get(`https://quanquan.asia/web/api/dean/getTask/${route.query.taskName}`)
  .then(config => {
    console.log(config.data)
    taskTitle.value = config.data.data[0].taskname
    taskSubTitle.value = config.data.data[0].describe
    creator.value = config.data.data[0].creator ? config.data.data[0].creator.name : "无"
    if (config.data.data[0].fileAddress.length !== 0) {
      for (let i = 0; i < config.data.data[0].fileAddress.length; i++) {
        fileList.push({
          title: config.data.data[0].fileAddress[i].name,
          link: config.data.data[0].fileAddress[i].url
        })
      }
    } else {
      fileList.push({
        title: "此处暂无文件",
        link: "javascript:void(0);"
      })
    }

    isLoading.value = false
  }).catch(error => {
  console.log(error)
})

function back() {
  router.push("/dean")
}
</script>
<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
