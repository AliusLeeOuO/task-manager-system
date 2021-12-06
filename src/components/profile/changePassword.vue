<template>
  <a-card title="修改密码">
    <a-form
      class="width"
      :model="formItem"
      :label-col="{ span: 3 }"
      :rules="rules"
      @finish="handleFinish"
    >
      <a-form-item ref="oldpwd" name="oldpwd" label="旧密码">
        <a-input-password v-model:value="formItem.oldpwd"></a-input-password>
      </a-form-item>
      <a-form-item ref="newpwd" name="newpwd" label="新密码">
        <a-input-password v-model:value="formItem.newpwd"></a-input-password>
      </a-form-item>
      <a-form-item ref="renewpwd" name="renewpwd" label="确认新密码">
        <a-input-password v-model:value="formItem.renewpwd"></a-input-password>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 3 }">
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
import { useRouter } from "vue-router";
import layout from "@/store/layout";

const router = useRouter();
interface formItem {
  oldpwd: string;
  newpwd: string;
  renewpwd: string;
}

const formItem = reactive<formItem>({
  oldpwd: "",
  newpwd: "",
  renewpwd: "",
});

const validatorRepwd = async function (rule: RuleObject, value: string) {
  if (!value) {
    return Promise.reject("请再输入一次新密码");
  } else if (value !== formItem.newpwd) {
    return Promise.reject("两次输入的密码不一致");
  }
  return Promise.resolve();
};

const rules = {
  oldpwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newpwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  renewpwd: [{ required: true, validator: validatorRepwd, trigger: "blur" }],
};

const handleFinish = (values: formItem) => {
  console.log(values);
  xhr
    .put(`updatedPws/${Cookies.get("id")}`, {
      old_password: values.oldpwd,
      new_password: values.newpwd,
    })
    .then(({ data }) => {
      console.log(data);
      if (data.status === 200) {
        message.success("密码修改成功！即将重新登录。");
        layout.mutation.logout();
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
