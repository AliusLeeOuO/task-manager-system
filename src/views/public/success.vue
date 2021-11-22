<template>
  <a-card :title="query.type">
    <a-result
      status="success"
      :title="query.title"
      :sub-title="query.subtitle"
    >
      <template #extra>
        <a-button key="console" type="primary" @click="backToIndex">返回首页</a-button>
      </template>
    </a-result>
  </a-card>
</template>
<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const router = useRouter()
const query = route.query



const backToIndex = () => {
  router.push("/")
}

</script>
<style lang="less" scoped>

</style>
