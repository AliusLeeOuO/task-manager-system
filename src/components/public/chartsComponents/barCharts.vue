<template>
  <div id="chart-layout">
    <div id="chart-title">
      <div id="title-block">
        <span>各方向任务完成进度 {{ moment().format("YYYY年MM月DD日") }}</span>
        <span style="color: #aaa"
          >截止{{ lastMonth }}综合进度 {{ average }} %</span
        >
      </div>
      <div>
        <a href="javascript:void(0);" id="export-all" @click="createImg"
          >导出全部图表到图片</a
        >
      </div>
    </div>
    <div class="charts">
      <echarts
        :id="i._id"
        :chart-data="i"
        v-for="i in statistical"
        :key="i._id"
      ></echarts>
    </div>
  </div>
  <a-back-top />
</template>
<script lang="ts" setup>
import Echarts, { chartData } from "./echarts.vue";
import xhr from "../../../xhr";
import { reactive, ref } from "vue";
import moment from "moment";
import html2canvas from "html2canvas";
import { message } from "ant-design-vue";

const statistical = reactive<chartData[]>([]);
const lastMonth = ref<string>("");
const average = ref<number>(0);
xhr
  .get("dean/statistical")
  .then(({ data }) => {
    for (let i in data.data) {
      statistical.push(data.data[i]);
    }
    lastMonth.value =
      statistical[0].journal[statistical[0].journal.length - 1].month;
    lastMonth.value = lastMonth.value.replace(/\//, "年");
    lastMonth.value += "月 ";
    const process = reactive<number[]>([]);
    for (let i in statistical) {
      process.push(
        statistical[i].journal[statistical[i].journal.length - 1].process
      );
    }
    let sum = 0;
    for (let i in process) {
      sum += process[i];
    }
    average.value = sum / process.length - 1;
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

// 截图
const createImg = async function () {
  const msg = message.loading("正在处理，请勿离开。");
  setTimeout(() => {
    html2canvas(document.querySelector("#chart-layout") as HTMLElement, {
      scale: 1, // 缩放
      allowTaint: true, // 是否使用图片跨域
      useCORS: true, // 是否使用图片跨域
      backgroundColor: "#E6ECF0",
    })
      .then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        let creatDom = document.createElement("a");
        document.body.appendChild(creatDom);
        creatDom.href = dataURL;
        creatDom.download = `双高方向任务进度${moment().format(
          "YYYY年MM月DD日"
        )}`;
        creatDom.click();
        msg.then(
          () => message.success("导出成功！"),
          () => {}
        );
        document.body.removeChild(creatDom);
      })
      .catch(() => {
        msg.then(
          () => message.error("导出失败！"),
          () => {}
        );
      });
  }, 2000);
};
</script>
<style lang="less" scoped>
#chart-title {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  #title-block {
    & > * {
      margin: 0 5px;
    }
  }

  #export-all {
    font-size: 15px;
  }
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > * {
    flex-basis: 49.5%;
    margin-bottom: 15px;
  }
}

@media only screen and (max-width: 1100px) {
  .charts {
    & > * {
      flex-basis: 100%;
      margin-bottom: 15px;
    }
  }
}
</style>
