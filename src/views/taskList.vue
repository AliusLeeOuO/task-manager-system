<template>
  <a-card title="任务列表">
    <!--    <template #extra><a href="#">more</a></template>-->
    <a-table :columns="columns" :data-source="tableData">
      <template #schedule="{text: schedule}">
        <a-progress :percent="schedule" status="active" />
      </template>
      <template #action>
        <a href="javascript:void(0);" @click="submitTask('tName')">查看/提交</a>
      </template>
    </a-table>
  </a-card>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter()
const columns = [
  {
    title: '任务列表'
    ,dataIndex: 'task'
    ,key: 'task'
  },
  {
    title: '下发时间'
    ,dataIndex: 'releaseTime'
    ,key: 'releaseTime'
  },
  {
    title: '进度'
    ,dataIndex: 'schedule'
    ,key: 'schedule'
    ,slots: {customRender: 'schedule'}
    ,width: '15%'
  },
  {
    title: '操作'
    ,dataIndex: 'action'
    ,key: 'action'
    ,slots: { customRender: 'action' }
  }
]
interface tableItem {
  key: number
  task: string
  schedule: number
  releaseTime: string
  children?: tableItem[]
}
const tableData:tableItem[] = [
  {
    key: 1
    ,task: "南职七训一元一平南职七训一元一平南职七训一元一平南职七训一元一平南职七训一元一平南职七训一元一平"
    ,schedule: 40
    ,releaseTime: "2021-11-11 11:11"
    ,children: [
      {
        key: 11
        ,task: "南职七训四楼一元一平南职七训四楼一元一平南职七训四楼一元一平南职七训四楼一元一平南职七训四楼一元一平"
        ,schedule: 20
        ,releaseTime: "2021-11-11 11:11"
      },{
        key: 12
        ,task: "南职七训三楼一元一平南职七训三楼一元一平南职七训三楼一元一平南职七训四楼一元一平南职七训三楼一元一平"
        ,schedule: 60
        ,releaseTime: "2021-11-11 11:11"
      }
    ]
  }
]
const submitTask = (tName:string) => {
  router.push({
    path: "/submit",
    query: {
      taskName: tName
    }
  })
}
</script>
<style lang="less" scoped>

</style>
