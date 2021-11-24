<template>
  <div id="box">
    <notice-block
      v-for="i in list"
      :key="i._id"
      title="通知"
      :content="delHtmlTag(i.tips)"
      :time="moment(i.createdAt).format('YYYY年MM月DD日 HH:mm:ss')"
      v-if="list.length !== 0"
    ></notice-block>
    <div v-else style="grid-column: 1 / 5">
      <a-empty :image="simpleImage">
        <template #description>
          <span>暂无通知</span>
        </template>
      </a-empty>
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeBlock from "../../components/public/noticeBlock.vue"
import xhr from "../../xhr"
import Cookies from "js-cookie"
import {message, Empty} from "ant-design-vue"
import {reactive} from "vue";
import moment from "moment"

let page = 0
let list = reactive<any>([])

function delHtmlTag(str: string) {
  return str.replace(/<[^>]+>/g, "");
}

xhr.get(`notice/pageNoticeList/${Cookies.get("id")}`, {
  params: {
    pagenum: page,
    pagesize: 4
  }
})
  .then((d) => {
    const lists = d.data.data
    if (d.data.status === 200) {
      for (let i in lists.notices) {
        list.push(lists.notices[i])
      }
      page++
    }
  })
  .catch(error => {
    console.warn(error)
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      message.error("响应错误")
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      message.error("服务端数据请求失败")
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      message.error("请求失败，致命错误")
      console.log('Error', error.message);
    }
  })

// 空状态
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>
<style lang="less" scoped>
#box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
</style>
