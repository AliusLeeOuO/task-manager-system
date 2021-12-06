<template>
  <a-card title="我的资料" class="cards">
    <div id="myProfile" class="width">
      <div id="avatar">
        <img :src="Cookies.get('Avatar')" alt="Avatar">
      </div>
      <div id="profiles">
        <p id="user">{{ Cookies.get("workerNumber") }} {{ Cookies.get("name") }}</p>
<!--        <a-button>更改头像</a-button>-->
      </div>
    </div>
  </a-card>
  <router-view></router-view>
  <profile-footer></profile-footer>
</template>
<script lang="ts" setup>
import Cookies from "js-cookie";
import ProfileFooter from "@/components/profile/profileFooter.vue"


</script>
<style lang="less" scoped>
.width {
  max-width: 1000px;
  margin: 0 auto;
}

#myProfile {
  display: flex;
  align-items: center;

  #avatar {
    width: 160px;
    height: 160px;
    overflow: hidden;
    border-radius: 1929321939123912px;
    margin-right: 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  #profiles {
    #user {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    #email {
      font-size: 23px;
    }
  }
}



.cards {
  margin-bottom: 10px;
}
</style>
