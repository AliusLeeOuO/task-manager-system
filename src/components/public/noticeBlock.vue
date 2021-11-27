<template>
  <div id="box">
    <div id="flex-one">
      <div id="header-block">
        <MessageOutlined/>
        <span id="notice-title">{{ props.title }}</span>
      </div>
      <div style="color: #aaa">{{ props.time }}</div>
    </div>

    <div class="content">
      <span>
        {{ content }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {MessageOutlined} from '@ant-design/icons-vue'

const props = defineProps<{
  title: string
  time: string
  content: string
}>()

function delHtmlTag(str: string) {
  return str.replace(/<[^>]+>/g, "");
}

let content =  delHtmlTag(props.content)
</script>
<style lang="less" scoped>
#box {
  cursor: pointer;
  padding: 5px;
  margin: 8px;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #E6F7FF;
  }

  #flex-one {
    display: flex;
    justify-content: space-between;
    align-items: center;


    #header-block {
      display: flex;
      align-items: center;

      #notice-title {
        display: inline-block;
        width: 140px;
        margin-left: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .content {
    font-size: 15px;
    width: 100%;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
}


</style>
