<template>
  <div id="box">
    <div>
      <file-block
        :created-at="i.createdAt"
        :describe="i.describe"
        :process="i.process"
        :file="i.files"
        :void="i.void"
        v-for="i in props.file"
        :key="i._id"
      ></file-block>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Empty} from 'ant-design-vue';
import FileBlock, {fls} from "./fileBlock.vue"

const props = defineProps<{
  file: fileLists[]
}>()

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


</script>
<style lang="less" scoped>
#box {
  margin-bottom: 10px;
}

</style>
