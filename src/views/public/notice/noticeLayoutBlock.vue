<template>
  <div id="box">
    <div id="header-block">
      <MessageOutlined/>
      <span id="notice-title">{{ props.title }}</span>
    </div>
    <div style="color: #aaa">发送人：{{ props.sender }}
      接收时间：{{ moment(props.time).format("YYYY年MM月DD日 HH:mm:ss") }}
      接收人：<span v-for="item in props.users" :key="item.id" style="margin: 0 2px">{{ item.name }}</span>
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
import moment from "moment"


interface usrs {
  id: string
  name: string
}

const props = defineProps<{
  title: string
  time: string
  content: string
  sender: string
  users: usrs[]
}>()

function delHtmlTag(str: string) {
  return str.replace(/<[^>]+>/g, "");
}

const content = delHtmlTag(props.content)
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


  #header-block {
    font-size: 20px;
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

  .content {
    font-size: 15px;
    width: 100%;
  }
}


</style>
