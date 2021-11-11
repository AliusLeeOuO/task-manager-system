<template>
  <a-card title="查看任务">

    <div id="form">
      <div v-if="isLoading">
        <a-skeleton :paragraph="{ rows: 6 }" active/>
      </div>
      <div v-else>
        <h2>{{ taskTitle }}</h2>
        <p>任务描述： {{ taskSubTitle }}</p>
        <p>创建人：{{ creator }}</p>
        <p>当前提交：{{ route.query.taskName }}</p>

        <h3>该任务的子任务</h3>
<!--          <show-table></show-table>-->
        <h2>提交的文件（点击下载）</h2>
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
import network from "../../network"
import ShowTable from "../../components/public/showTable.vue"
import FileCpn from "../../components/public/fileData.vue"

const route = useRoute()
const router = useRouter()

let taskTitle = ref<string>("")
let taskSubTitle = ref<string>("")
let creator = ref<string>("")

const taskid = route.params.taskid
interface fileList {
  title: string
  link: string
}

let isLoading = ref<boolean>(true)

let fileList = reactive<fileList[]>([])

interface childTasks {
  id: string
  name: string
  subtitle: string,
  children?: childTasks[]
}
// let childTasks = reactive<childTasks[]>([])
network.get(`https://quanquan.asia/web/api/dean/getTask/${taskid}`)
  .then(config => {
    taskTitle.value = config.data.data[0].taskname
    taskSubTitle.value = config.data.data[0].describe
    // 文件
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

    // 子任务
    // console.log(config.data.data[0].children)
    // for(let i = 0;i < config.data.data[0].children.length;i++) {
    //   childTasks.push({
    //     id: config.data.data[0].children._id,
    //     name: config.data.data[0].children
    //   })
    // }


    isLoading.value = false
  }).catch(error => {
  console.log(error)
})

function back() {
  router.go(-1)
}


const activeKey = ref([]);
</script>
<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
