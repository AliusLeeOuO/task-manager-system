<template>
  <a-card title="在线查看文件">
    <template #extra>
      <div class="btns">
        <a :href="link" :download="link">下载</a>
        <a-button @click="back">返回</a-button>
      </div>
    </template>
    <div class="showLayout" v-if="type === 'office'">
      <iframe :src="officeUrl" allowfullscreen></iframe>
    </div>
    <div class="showLayout" v-else-if="type === 'photo'">
      <img :src="link" />
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const type = route.query.type
const link = route.query.link ? route.query.link.toString() : ""
let officeUrl = `https://view.officeapps.live.com/op/view.aspx?src=${link}`

const back = () => {
  router.go(-1)
}
</script>
<style lang="less" scoped>
.showLayout {
  height: calc(100vh - 200px);
  text-align: center;
  overflow: hidden;
  & > * {
    max-height: 100%;
  }

  & > img {
    max-width: 100%;
    max-height: 100%;
  }

  & > iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
}

.btns {
  & * > {
    margin: 0 10px;
  }
}
</style>
