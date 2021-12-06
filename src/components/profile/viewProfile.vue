<template>
  <a-card title="个人资料信息" class="cards">
    <div class="width" id="profile-layout">
      <div class="profile-block">
        <div>联系电话</div>
        <div>
          {{ myProfile.phone }}
        </div>
      </div>
      <div class="profile-block">
        <div>电子邮箱</div>
        <div>
          {{ myProfile.email }}
        </div>
      </div>
      <div id="btns">
        <a-button @click="toChange">修改我的个人资料</a-button>
        <a-button @click="toChangePassword">修改我的密码</a-button>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import Cookies from "js-cookie";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { reactive } from "vue";

const myProfile = reactive({
  phone: "",
  email: "",
});
myProfile.phone = Cookies.get("phone") as string;
myProfile.email = Cookies.get("email") as string;
onBeforeRouteUpdate(() => {
  myProfile.phone = Cookies.get("phone") as string;
  myProfile.email = Cookies.get("email") as string;
});

const router = useRouter();
const toChange = () => {
  router.push("/myProfile/change");
};
const toChangePassword = () => {
  router.push("/myProfile/changePassword");
};
</script>
<style lang="less" scoped>
.width {
  max-width: 1000px;
  margin: 0 auto;
}
#profile-layout {
  .profile-block {
    @height: 40px;
    display: grid;
    grid-template-columns: 1fr 5fr;
    height: @height;
    line-height: @height;
    border-bottom: 1px solid #ccc;
    margin: 15px 0;
  }

  #btns {
    & > * {
      margin-right: 10px;
    }
  }
}
</style>
