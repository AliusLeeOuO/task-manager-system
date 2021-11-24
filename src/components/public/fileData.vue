<template>
  <div>
    <a-collapse
      v-model:activeKey="activeKey"
      accordion
      :bordered="false"
      v-if="props.file.length !== 0"
    >
      <a-collapse-panel :key="item._id" :header="item.describe" v-for="(item, index) in props.file">
        <a-card v-if="item.files.length !== 0">
          <a-card-grid
            style="width: 100%; text-align: center;padding: 0"
            v-for="(itemx, index) in item.files"
            :key="itemx.filename"
          >
            <a
              :href="itemx.url"
              style="height: 100%;width: 100%;display: block;padding: 20px"
            >{{ itemx.filename }}</a>
          </a-card-grid>
        </a-card>
        <a-card style="width: 100%; text-align: center;padding: 0">
          此处暂无文件
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <div v-else>
      <a-empty :image="simpleImage"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue"
import {Empty} from 'ant-design-vue';

interface fileList {
  describe: string
  userId: string
  _id: string
  files: file[]
}

interface file {
  encoding: string
  fieldname: string
  filename: string
  mimetype: string
  originalname: string
  url: string
}

const props = defineProps<{
  file: fileList[]
}>()

const activeKey = ref([]);
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>
<style lang="less" scoped>
</style>
