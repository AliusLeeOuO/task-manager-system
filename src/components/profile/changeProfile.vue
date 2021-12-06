<template>
  <a-card title="修改个人资料">
    <a-form
      class="width"
      :model="profile"
      :label-col="{ span: 2 }"
      :rules="rules"
      @finish="handleFinish"
    >
      <a-form-item ref="email" name="email" label="电子邮箱">
        <a-input v-model:value="profile.email"></a-input>
      </a-form-item>
      <a-form-item ref="phone" name="phone" label="联系电话">
        <a-input v-model:value="profile.phone"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 2 }">
        <a-button type="primary" style="margin-right: 5px" html-type="submit"
          >修改</a-button
        >
        <a-button @click="goBack">返回</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { RuleObject } from "ant-design-vue/es/form/interface";
import xhr from "@/xhr";
import Cookies from "js-cookie";
import { message } from "ant-design-vue";
import router from "@/router";

interface profile {
  phone: string;
  email: string;
}

const profile = reactive<profile>({
  phone: "",
  email: "",
});

const validatorEmail = async function (rule: RuleObject, value: string) {
  const regExp =
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!value) {
    return Promise.reject("请输入邮箱");
  } else if (!regExp.test(value)) {
    return Promise.reject("请输入正确的邮箱");
  }
  return Promise.resolve();
};
const validatorPhone = async function (rule: RuleObject, value: string) {
  const RegExp = /^[0-9]*$/;
  if (!value) {
    return Promise.reject("请输入手机号");
  } else if (!RegExp.test(value)) {
    return Promise.reject("请输入正确的手机号");
  }
  return Promise.resolve();
};

const rules = {
  email: [{ required: true, validator: validatorEmail, trigger: "blur" }],
  phone: [{ required: true, validator: validatorPhone, trigger: "blur" }],
};

const handleFinish = (values: profile) => {
  xhr
    .put(`updatedUser/${Cookies.get("id")}`, {
      phone: values.phone,
      email: values.email,
    })
    .then(({ data }) => {
      if (data.status === 200) {
        console.log(data);
        message.success("修改信息成功！");
        Cookies.set("email", values.email);
        Cookies.set("phone", values.phone);

        router.push("/myProfile/view");
      }
    })
    .catch((error) => {
      console.warn(error);
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error("响应错误");
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        message.error("服务端数据请求失败");
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        message.error("请求失败，致命错误");
        console.log("Error", error.message);
      }
    });
};

const goBack = () => {
  router.go(-1);
};
</script>
<style lang="less" scoped>
.width {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
