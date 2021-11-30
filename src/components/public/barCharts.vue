<template>
  <div id="chart-layout">
    <div id="chart-title">
      <span>各方向任务完成进度 {{ moment().format("YYYY年MM月DD日") }}</span>
      <a href="javascript:void(0);" id="export-all" @click="createImg">导出全部图表到图片</a>
    </div>
    <div class="charts">
      <echarts :id="i._id" :chart-data="i" v-for="i in statistical" :key="i._id"></echarts>
    </div>
  </div>
  <a-back-top />
</template>
<script lang="ts" setup>
import Echarts, { chartData } from "./echarts.vue"
import xhr from "../../xhr"
import { reactive } from "vue";
import moment from "moment";
import html2canvas from "html2canvas";
import { message } from "ant-design-vue";

const statistical = reactive<chartData[]>([])
xhr.get("dean/statistical")
  .then(({ data }) => {
    for (let i in data.data) {
      statistical.push(data.data[i])
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

// 截图
const createImg = async function () {
  const msg = message.loading("正在处理，请勿离开。")
  setTimeout(() => {
    html2canvas((document.querySelector("#chart-layout") as HTMLElement), {
      scale: 1, // 缩放
      allowTaint: true, // 是否使用图片跨域
      useCORS: true, // 是否使用图片跨域
      backgroundColor: "#E6ECF0"
    }).then(canvas => {
      let dataURL = canvas.toDataURL("image/png");
      let creatDom = document.createElement("a");
      document.body.appendChild(creatDom);
      creatDom.href = dataURL;
      creatDom.download = `双高方向任务进度${moment().format("YYYY年MM月DD日")}`;
      creatDom.click();
      msg.then(() => message.success("导出成功！"), () => { })
    }).catch(() => {
      msg.then(() => message.error("导出失败！"), () => { })
    });
  }, 2000)
}
</script>
<style lang="less" scoped>
#chart-title {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #export-all {
    font-size: 15px;
  }
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
</style>
