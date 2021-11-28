<template>
  <div id="title">
    <span>提交记录</span>
    <a-button type="primary" :disabled="props.file.length === 0">下载全部文件</a-button>
  </div>
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
        v-if="props.file.length !== 0"
      ></file-block>
      <a-empty :image="simpleImage" v-else/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Empty} from 'ant-design-vue';
import FileBlock, {fls} from "./fileBlock.vue"

const props = defineProps<{
  file: fileLists[]
}>()
console.log(props.file)
// TODO: 后端疑似改动 没有void报错 等待处理
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
#title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;

  span {
    font-size: 18px;
  }
}

#box {
  margin-bottom: 10px;
}

</style>
