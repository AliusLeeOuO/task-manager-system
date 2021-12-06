<template>
  <div id="layout">
    <div id="short-msg">
      <span>{{ userInfo }}</span>
    </div>
    <div id="userContent">
      <div id="top"></div>
      <div id="content">
        <div id="avatar">
          <img :src="profiles.avatar" alt="Avatar" />
        </div>
        <div>
          <p id="user">{{ profiles.workerNumber }} {{ profiles.name }}</p>
          <p id="email">{{ profiles.email }}</p>
          <p id="btns">
            <a href="javascript:void(0);" @click="myProfile">编辑个人资料</a>
            <a href="javascript:void(0);" @click="exitAccount">退出登录</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Cookies from "js-cookie";
import layout from "@/store/layout";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { reactive } from "vue";
const userInfo = Cookies.get("user");
const exitAccount = () => {
  layout.mutation.logout();
};
const profiles = reactive({
  workerNumber: "",
  name: "",
  email: "",
  avatar: "",
});
profiles.workerNumber = Cookies.get("workerNumber") as string;
profiles.name = Cookies.get("name") as string;
profiles.email = Cookies.get("email") as string;
profiles.avatar = Cookies.get("Avatar") as string;
onBeforeRouteUpdate(() => {
  profiles.workerNumber = Cookies.get("workerNumber") as string;
  profiles.name = Cookies.get("name") as string;
  profiles.email = Cookies.get("email") as string;
});

const router = useRouter();
const myProfile = () => {
  router.push("/myProfile");
};
</script>
<style lang="less" scoped>
@main-color: #2286f7;
p {
  margin-bottom: 0;
}
#layout {
  height: 100%;
  position: relative;
  #short-msg {
    padding: 0 10px;
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: auto auto;
    cursor: pointer;
    & > * {
      margin: 0 3px;
    }
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
  #userContent {
    @width: 300px;
    width: @width;
    height: 200px;
    position: absolute;
    right: 0;
    transition: 0.3s ease-in-out;

    z-index: -999999;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-10px);
    &.showBlock {
      z-index: inherit;
      pointer-events: inherit;
      opacity: 1;
      transform: translateY(0);
    }

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
      right: 10px;
      margin: auto;
    }
    #content {
      overflow: hidden;
      border-radius: 5px;
      transform: translateY(10px);
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
      padding: 10px;
      display: grid;
      grid-template-columns: 2fr 3fr;
      align-items: center;
      #avatar {
        width: 88px;
        height: 88px;
        border-radius: 99999999999999999px;
        overflow: hidden;
        margin: 0 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      #user {
        font-size: 18px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      #email {
        width: 100%;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      #btns {
        & > * {
          margin: 0 2px;
        }
      }
    }
  }
}

#layout:hover #userContent {
  z-index: inherit;
  pointer-events: inherit;
  opacity: 1;
  transform: translateY(0);
}
</style>
