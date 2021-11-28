<template>
  <div id="link">
    <router-link :to="to" href="javascript:void(0)" id="nav-block">
      {{ navTitle }}
      <a-badge
        :count="props.alertCount"
        style="transform: scale(0.9);position: absolute;right: -5px;top: 6px;"
      />
    </router-link>
    <div id="follow" v-if="props.extend">
      <div id="top"></div>
      <div id="layout">
        <div id="layout-title">
          通知
        </div>
        <div id="layout-lists">
          <NoticeBlock v-for="i in list"
                       :key="i._id"
                       title="通知"
                       :content="i.tips"
                       :time="moment(i.createdAt).format('YYYY/MM/DD HH:mm:ss')"
                       v-if="list.length !== 0"
          >
          </NoticeBlock>
          <div v-else id="none-notice">
            <a-empty :image="simpleImage"/>
          </div>
        </div>
        <div id="more">
          <router-link to="/notice">查看更多</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from "vue";
import {message, Empty} from "ant-design-vue";
import xhr from "../../xhr"
import Cookies from "js-cookie";
import NoticeBlock from "../public/noticeBlock.vue"
import moment from "moment";

let props = defineProps<{
  navTitle: string
  to: string
  alertCount?: number
  extend: boolean
}>()

xhr.get(`notice/pageNoticeList/${Cookies.get("id")}`, {
  params: {
    pagenum: 0,
    pagesize: 99999
  }
})
  .then((d) => {
    const lists = d.data.data
    if (d.data.status === 200) {
      for (let i in lists.notices) {
        list.push(lists.notices[i])
      }
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

// import { ClockCircleOutlined } from '@ant-design/icons-vue';

let list = reactive<any>([])


const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>
<style lang="less" scoped>
@nav-height: 64px;
@main-color: #2286f7;
#nav-block {
  position: relative;
  text-decoration: none;
  color: #000;
  margin: 0 10px;
  display: block;
  height: 100%;
  line-height: @nav-height;
  transition: 0.3s linear;

  &:hover {
    color: @main-color;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #fff;
    transition: all 0.3s;
  }

  &:hover::before {
    background-color: @main-color;
  }
}

.router-link-active {
  color: @main-color !important;

  &::before {
    background-color: @main-color !important;
  }
}

#link {
  position: relative;
}

#follow {
  @width: 350px;
  height: 200px;
  position: absolute;
  left: calc(50% - @width * .5);
  width: @width;

  transition: 0.3s ease-in-out;
  z-index: -999999999;
  opacity: 0;
  pointer-events: none;

  #top {
    @height: 20px;
    @width: 20px;
    height: @height;
    width: @width;
    border-top: @height*.5 solid transparent;
    border-left: @height*.5 solid transparent;
    border-right: @height*.5 solid transparent;
    border-bottom: @height*.5 solid #fff;
    position: absolute;
    top: -@height*.5;
    left: 0;
    right: 0;
    margin: auto;
  }
}

.link-enter() {
  opacity: 1;
  pointer-events: inherit;
  z-index: 2;
}

#link:hover #follow,
#follow:hover #follow {
  .link-enter
}

#layout {
  transform: translateY(10px);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;

  #layout-title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #E6ECF0;
  }

  #layout-lists {
    max-height: 300px;
    overflow-y: auto;
  }

  #more {
    height: 30px;
    line-height: 30px;

    a {
      display: block;
      height: 100%;
      width: 100%;
      text-align: center;
      border-radius: 5px;
      transition: 0.3s ease-in-out;

      &:hover {
        background-color: #E6F7FF;
      }
    }
  }
}
</style>
