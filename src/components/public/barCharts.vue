<template>
  <card title="各专业完成度概览">
    <div id="chart">
      <Echarts :options="chartData"></Echarts>
    </div>
  </card>
</template>
<script lang="ts" setup>
import Echarts from "./echarts.vue"
import network from "../../xhr"
import {EChartOption} from 'echarts'
import {reactive} from "vue";
import Card from "./card.vue"

let xData: string[] = reactive([])
let yDataa: number[] = reactive([])
let yDatab: number[] = reactive([])
const chartData:EChartOption = {
  xAxis: [{
    type: 'category',
    data: xData
  }],
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} %'
    }
  },
  tooltip: {
    show: true,
    formatter(params: any) {
      return `${params.name}: ${params.data}%`
    }
  },
  series: [{
    name: "任务总数",
    stack: "x",
    data: yDataa,
    type: "bar"
  }, {
    name: "完成的任务",
    stack: "x",
    data: yDatab,
    type: "bar",
    itemStyle: {
      normal: {
        label: {
          show: true,  //开启显示
          position: 'top',  //在上方显示
          textStyle: {  //数值样式
            color: 'black'
          },
          formatter(params: any) {
            return `${params.data}个`
          }
        }
      }
    },
  }],
}

network.get("dean/statistical").then(({data}) => {
  console.log(data.data)
  for (let i = 0; i < data.data.length; i++) {
    xData.push(data.data[i].name)
    yDataa.push(data.data[i].total - data.data[i].TaskNum)
    yDatab.push(data.data[i].total)
  }
}).catch(err => {

})
</script>
<style lang="less" scoped>
#chart {
  height: 500px
}
</style>
