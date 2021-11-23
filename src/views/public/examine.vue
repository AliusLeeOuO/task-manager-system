<template>
  <a-card title="待办审核">
    <a-table :dataSource="dataSource" :columns="columns">
      <template #status="{ record }">
        <a-tag color="blue" v-if="record.status === 0">待审核</a-tag>
        <a-tag color="green" v-else-if="record.status === 1">已审核</a-tag>
        <a-tag color="red" v-else-if="record.status === 2">被打回</a-tag>
        <a-tag v-else>未知</a-tag>
      </template>
      <template #operation="{ record }">
        <a
          href="javascript:void(0);"
          @click="operation(record.key)"
          v-if="record.status === 0"
        >查看并审核</a>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import preLoad from "../../store/preLoad";
let columns = [
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
  }, {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
    slots: { customRender: 'status' }
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  }, {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  }, {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  },
]

interface dataSource {
  key: string
  status: number
  taskName: string
  createdAt: string
  updatedAt: string
}

let dataSource = preLoad.state.examineList


preLoad.mutation.refreshExamine()

const router = useRouter()
const operation = (key: string) => {
  router.push(`/examineOnce/${key}`)
  message.info(key)
}
</script>

<style scoped>
</style>
