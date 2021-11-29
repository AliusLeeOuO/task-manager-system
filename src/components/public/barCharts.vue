<template>
  <div id="chart-title">
    各方向任务完成进度
  </div>
  <div class="charts">
    <echarts :id="i._id" :chart-data="i" v-for="i in statistical"></echarts>
  </div>
</template>
<script lang="ts" setup>
import Echarts, {chartData} from "./echarts.vue"
import xhr from "../../xhr"
import {reactive} from "vue";

const statistical = reactive<chartData[]>([])
xhr.get("dean/statistical")
  .then(({data}) => {
    for (let i in data.data) {
      statistical.push(data.data[i])
    }
  })
  .catch(error => {
    throw error
  })

</script>
<style lang="less" scoped>
#chart-title {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 18px;
}
.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
</style>
