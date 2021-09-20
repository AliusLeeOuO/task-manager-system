<template>
  <div id="login-layout">
    <div id="login-block">
      <div id="login-title">
        <h3>登录到 双高任务管理系统</h3>
      </div>
      <div id="login-form">
        <p id="login-type">使用 教职工号 登录</p>
        <form>
          <div class="input-block">
            <input type="text" id="username" placeholder=" ">
            <label for="username">教职工号、用户名</label>
          </div>
          <div class="input-block">
            <input type="password" id="password" placeholder=" ">
            <label for="password">密码</label>
          </div>
          <div class="input-block">
            <a-checkbox>记住我的登录状态</a-checkbox>
          </div>
          <div class="input-block" id="submit">
            <a-button type="primary" style="width: 100%">登录</a-button>
          </div>
          <div class="input-block" id="feedbackPwd">
            <p>登录遇到问题？<a href="javascript:void(0);">找回密码</a></p>
          </div>
        </form>
      </div>
    </div>
    <div id="cookie-alert" :class="{hiddenAlert: acceptAlert}">
      <div>
        <span>！请注意</span>
        <br>
        <span>本网站使用cookie，用于在您的设备中储存信息。这些cookie可以使网站正常运行。使用本网站，即表示您接受放置这些cookie。</span>
        <br>
        <button  @click="accept">同意并关闭提示</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const acceptAlert = ref<boolean>(false)
function accept () {
  acceptAlert.value = true
}
</script>
<style lang="less" scoped>
#login-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f1f2f6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  #login-block {
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px #ccc;
    padding: 20px 20px 0;

    #login-title {
      padding: 10px 0;
      text-align: center;
      font-size: 23px;
    }

    .input-block {
      position: relative;
      width: 90%;
      margin: 0 auto;
    }

    #login-type {
      width: 90%;
      margin: 0 auto;
    }

    #login-form {
      input[type="text"],
      input[type="password"] {
        height: 40px;
        width: 100%;
        margin: 15px auto;
        display: block;
        outline: 0;
        border: 0;
        border-bottom: 1px solid #1890ff;
        padding: .5rem;
        & ~ label {
          position: absolute;
          top: 48%;
          left: 1%;
          transform: translateY(-50%);
          font-size: 13px;
          transition: 0.3s;
          background-color: #fff;
        }

        &:focus,
        &:not(:placeholder-shown) {
          border-bottom: 0.1rem solid #1890ff;
        }

        &:focus ~ label,
        &:not(:placeholder-shown) ~ label {
          top: -3px;
          left: 1%;
          font-size: 10px;
        }
      }

      #submit {
        margin: 10px auto;
      }
      #feedbackPwd {
        text-align: center;
      }
    }
  }
  #cookie-alert {
    position: absolute;
    bottom: 0;
    width: 100vw;
    background-color: #dddde0;
    text-align: center;
    transition: 1s ease-in-out;
    animation: 1s showAlert;
    div {
      padding: 0 20px;
      display: inline-block;
      text-align: left;
      span {
        line-height: 30px;
        &:first-child {
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
      button {
        float: right;
        background-color: #1890ff;
        border: 0;
        padding: 3px 10px;
        color: #fff;
        border-radius: 3px;
        margin-bottom: 5px;
        z-index: 9999;
        cursor: pointer;
      }
    }
  }
}
.hiddenAlert {
  bottom: -150px !important;
}
@keyframes showAlert {
  0%{bottom: -150px}
  100%{bottom: 0}
}
</style>
