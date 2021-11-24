<template>
  <a-card title="各专业完成度概览">
    <div id="chart">
      <Echarts :options="chartData"></Echarts>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import Echarts from "./echarts.vue"
import xhr from "../../xhr"
import {EChartOption} from 'echarts'
import {reactive} from "vue";


let xData: string[] = reactive([])
let yDataa: number[] = reactive([])
let yDatab: number[] = reactive([])
const chartData: EChartOption = {
  xAxis: [{
    type: 'category',
    data: xData
  }],
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 个'
    }
  },
  tooltip: {
    show: true,
    formatter(params: any) {
      return `${xData[params.dataIndex]}: 总任务${yDataa[params.dataIndex]}个，完成${yDatab[params.dataIndex]}个，未完成${yDataa[params.dataIndex]}个。`
    }
  },
  series: [
    {
      name: "任务总数",
      stack: "x",
      data: yDataa,
      type: "bar",
      itemStyle: {
        normal: {
          color: "skyblue",
          label: {
            show: true,  //开启显示
            position: 'top',  //在上方显示
            textStyle: {  //数值样式
              color: 'black'
            },
            formatter(params: any) {
              return `完成率： ${(yDatab[params.dataIndex] / yDataa[params.dataIndex]) ? (yDatab[params.dataIndex] / yDataa[params.dataIndex]) : 0}%`
            }
          }
        }
      }
    },
    {
      name: "完成数量",
      stack: "x",
      data: yDatab,
      type: "bar",
      itemStyle: {
        normal: {
          color: "pink"
        }
      }
    }
  ],
}

xhr.get("dean/statistical").then(({data}) => {
  for (let i = 0; i < data.data.length; i++) {
    // 专业名称
    xData.push(data.data[i].name)
    // 任务总数 - 完成数量 = 未完成个数
    yDataa.push(data.data[i].total - data.data[i].TaskNum)
    // 完成数量
    yDatab.push(data.data[i].TaskNum)
  }
}).catch(err => {

})
</script>
<style lang="less" scoped>
#chart {
  height: 500px;
}
</style>
