<template>
  <div id="login-layout">
    <div id="layout-left"></div>
    <div id="layout-right">
      <div id="login-block">
        <div id="login-title">
          <h3>登录 双高任务管理系统</h3>
        </div>
        <div id="login-form">
          <p id="login-type">使用 教职工号 登录</p>
          <div v-if="layout.state.loginError">
            <a-alert
              :message="layout.state.loginError"
              type="error"
              show-icon
              style="height: 35px"
            />
          </div>
          <a-form @submit="submit">
            <div class="input-block">
              <a-input
                placeholder="用户名、教职工号"
                v-model:value="formItems.username"
                style="height: 44px"
              >
                <template #prefix>
                  <user-outlined type="user" />
                </template>
              </a-input>
            </div>
            <div class="input-block">
              <a-input-password
                placeholder="密码"
                v-model:value="formItems.password"
                style="height: 44px"
              >
                <template #prefix>
                  <IdcardOutlined />
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
                style="width: 100%;height: 47px;border-radius: 5px"
              >登录</a-button>
            </div>
          </a-form>
        </div>
      </div>
      <div id="cookie-alert" :class="{ hiddenAlert: acceptAlert }">
        <div>
          <span>
            <WarningOutlined></WarningOutlined>请注意
          </span>
          <br />
          <span>本网站使用cookie，用于在您的设备中储存信息。这些cookie可以使网站正常运行。使用本网站，即表示您接受放置这些cookie。</span>
          <br />
          <button @click="accept">同意并关闭提示</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import xhr from "../../xhr"
import { IdcardOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons-vue'
import { useRouter } from "vue-router"
import layout from "../../store/layout";
import Cookies from 'js-cookie'
// 如果登录 跳转首页
const router = useRouter();
if (Cookies.get("token")) {
  router.push("/")
}

// 表单容器
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
    if (str == null) {
      str = "";
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  formItems.username = trim(formItems.username)
  formItems.password = trim(formItems.password)
  if (formItems.username === "" || formItems.username.indexOf(" ") !== -1) {
    layout.state.loginError = "请输入正确的用户名"
    return false
  } else if (formItems.password === "" || formItems.password.indexOf(" ") !== -1) {
    layout.state.loginError = "请输入正确的密码"
    return false
  }

  //通过后发送网络请求
  xhr.post("login", {
    workerNumber: formItems.username,
    password: formItems.password
  }).then(data => {
    const status = data.data
    if (status.status === 200) {
      if (formItems.remember) {
        setCookies(status.data, 7)
      } else {
        setCookies(status.data, 1)
      }
      layout.state.loginError = null
      router.push("/")
    }
  }).catch(error => {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      if (error.response.status === 400) {
        layout.state.loginError = "账号或密码错误"
      }
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      layout.state.loginError = "服务端数据请求失败"
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      layout.state.loginError = "请求失败，致命错误"
      console.log('Error', error.message);
    }
  })

  function setCookies(data: any, time: number) {
    Cookies.set("id", data.data._id, {
      expires: time,
      secure: true
    })

    Cookies.set("token", data.token, {
      expires: time,
      secure: true
    })

    Cookies.set("parentId", data.data.parentId, {
      expires: time
    })
    Cookies.set("workerNumber", data.data.workerNumber, {
      expires: time
    })
    Cookies.set("Avatar", data.data.image, {
      expires: time
    })
    Cookies.set("email", data.data.email, {
      expires: time
    })
    Cookies.set("name", data.data.name, {
      expires: time
    })
    Cookies.set("phone", data.data.phone, {
      expires: time
    })

    Cookies.set(
      "user",
      userInfo(data.data.position ? data.data.position.name : undefined, data.data.rofessional ? data.data.rofessional.name : undefined, data.data.name),
      {
        expires: time
      }
    )

    function userInfo(a?: string, b?: string, c?: string) {
      let userInfo = ""
      for (let i = 0; i < arguments.length; i++) {
        userInfo += arguments[i]
        if (i + 1 === arguments.length) {
          continue;
        }
        userInfo += " - "
      }
      return userInfo
    }
  }

  event.stopPropagation()
}

// Cookie提示
const acceptAlert = ref<boolean>(false)
if (Cookies.get("acceptCookie") === "true") {
  acceptAlert.value = true
}

function accept() {
  Cookies.set("acceptCookie", "true", {
    expires: 365
  })
  acceptAlert.value = true
}
</script>
<style lang="less" scoped>
#login-layout {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;
  & > * {
    height: 100vh;
    overflow: hidden;
  }
  #layout-left {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-image: url("static/login_bg.jpg");
    background-size: cover;
    background-position: left;
  }
  #layout-right {
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
    display: grid;
    place-items: center;
    width: calc(100vw - 450px);
    position: fixed;
    right: 0;
    #login-block {
      min-width: 480px;
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
  }
  .input-block {
    margin: 15px auto;
  }

  #cookie-alert {
    position: absolute;
    bottom: 0;
    width: 100%;
    //background-color: #F4F4F4;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
    text-align: center;
    transition: 1s ease-in-out;
    animation: 1s showAlert;
    border-radius: 10px 10px 0 0;
    div {
      padding: 0 20px;
      display: inline-block;
      text-align: left;

      span {
        &:first-child {
          font-size: 20px;
          font-weight: bold;
          margin: 15px 0 5px;
        }

        &:nth-child(3) {
          height: 35px;
          line-height: 35px;
        }
      }

      button {
        margin-bottom: 10px;
        float: right;
        background-color: #1890ff;
        border: 0;
        padding: 3px 10px;
        color: #fff;
        border-radius: 3px;
        z-index: 9999;
        cursor: pointer;
      }
    }
  }
}

.hiddenAlert {
  pointer-events: none;
  bottom: -150px !important;
  opacity: 0;
}

@keyframes showAlert {
  0% {
    bottom: -150px;
  }
  100% {
    bottom: 0;
  }
}

@keyframes hiddenAlert {
  0% {
    display: block;
    bottom: 0;
  }
  99% {
    bottom: -150px;
  }
  100% {
    display: none;
  }
}

@media only screen and (max-width: 1120px) {
  #login-layout {
    #layout-right {
      width: 100vw;
    }
  }
}
</style>
