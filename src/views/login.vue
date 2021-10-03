<template>
  <div id="login-layout">
    <div id="login-block">
      <div id="login-title">
        <h3>登录到 双高任务管理系统</h3>
      </div>

      <div id="login-form">
        <p id="login-type">使用 教职工号 登录</p>
        <div v-if="layout.state.loginError">
          <a-alert :message="layout.state.loginError" type="error" show-icon style="height: 30px"/>
        </div>
        <a-form @submit="submit">
          <div class="input-block">
            <a-input placeholder="用户名、教职工号" v-model:value="formItems.username">
              <template #prefix>
                <user-outlined type="user"/>
              </template>
            </a-input>
          </div>
          <div class="input-block">
            <a-input-password placeholder="密码" v-model:value="formItems.password">
              <template #prefix>
                <IdcardOutlined/>
              </template>
            </a-input-password>
          </div>
          <div class="input-block">
            <a-checkbox v-model:checked="formItems.remember">记住我的登录状态</a-checkbox>
          </div>
          <div class="input-block">
            <a-button
              type="primary"
              html-type="submit"
              style="width: 100%"
            >
              登录
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
    <div id="cookie-alert" :class="{hiddenAlert: acceptAlert}">
      <div>
        <span><WarningOutlined></WarningOutlined> 请注意</span>
        <br>
        <span>本网站使用cookie，用于在您的设备中储存信息。这些cookie可以使网站正常运行。使用本网站，即表示您接受放置这些cookie。</span>
        <br>
        <button @click="accept">同意并关闭提示</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref, reactive} from "vue";
import axios from "axios";
import {IdcardOutlined, UserOutlined, WarningOutlined} from '@ant-design/icons-vue'
import {useRouter} from "vue-router"
import layout from "../store/layout";
import Cookies from 'js-cookie'

const router = useRouter();
if (Cookies.get("token")) {
  router.push("/")
}
const acceptAlert = ref<boolean>(false)


function accept() {
  Cookies.set("acceptCookie", "true", {
    expires: 30
  })
  acceptAlert.value = true
}

interface formItem {
  username: string
  password: string
  remember: boolean
}

const formItems = reactive<formItem>({
  username: "",
  password: "",
  remember: false
})

function submit(event: FormDataEvent) {

  //登录验证
  function trim(str: string) {
    if(str == null){
      str = "";
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  formItems.username = trim(formItems.username)
  formItems.password = trim(formItems.password)
  if(formItems.username === "" || formItems.username.indexOf(" ") !== -1){
    layout.state.loginError = "请输入正确的用户名"
    return false
  }else if (formItems.password === "" || formItems.password.indexOf(" ") !== -1) {
    layout.state.loginError = "请输入正确的密码"
    return false
  }


  //通过后发送网络请求
  const loginNetwork = axios.create({
    baseURL: "https://quanquan.asia/web/api/login",
    method: "POST"
  })

  loginNetwork.interceptors.response.use(function (data) {
    return data
  })

  loginNetwork({
    data: {
      name: formItems.username,
      password: formItems.password
    }
  }).then((data)=> {
    const status = data.data.status
    switch (status) {
      case 401:
        layout.state.loginError = data.data.msg
        break
      case 200:
        if(formItems.remember) {
          setCookies(data.data,7)
        }else {
          setCookies(data.data,1)
        }
        layout.state.loginError = null
        router.push("/")
        break
    }
  }).catch((error)=> {
    layout.state.loginError = error
  })
  function setCookies(data:any,time:number) {
    Cookies.set("position", (function () {
      if (data.data.position) {
        return data.data.position.name
      } else {
        return " "
      }
    })(), {
      expires: time
    })
    Cookies.set("rofessional", (function () {
      if (data.data.rofessional) {
        return data.data.rofessional.name
      } else {
        return " "
      }
    })(), {
      expires: time
    })
    Cookies.set("token",data.token,{
      expires: time
    })
    Cookies.set("parentId",data.data.parentId,{
      expires: time
    })
  }
  event.stopPropagation()
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
    padding: 20px 40px;

    #login-title {
      padding: 10px 0;
      text-align: center;
      font-size: 23px;

      h3 {
        margin: 0;
      }
    }
  }

  .input-block {
    margin: 15px auto;
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
        &:first-child {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        &:nth-child(3) {
          line-height: 25px;
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
  opacity: 0;
}

@keyframes showAlert {
  0% {
    bottom: -150px
  }
  100% {
    bottom: 0
  }
}

@keyframes hiddenAlert {
  0% {
    display: block;
    bottom: 0
  }
  99% {
    bottom: -150px
  }
  100% {
    display: none;
  }
}
</style>
