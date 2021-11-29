<template>
  <a-card class="chart" :title="props.chartData.taskname">
    <div class="layout">
      <div :id="props.id" class="container" ref="container"></div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts/core';
import {GridComponent, GridComponentOption, TooltipComponent} from 'echarts/components';
import {LineChart, LineSeriesOption} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {onMounted, reactive} from "vue";

const props = defineProps<{
  id: string
  chartData: chartData
}>()

interface axis {
  month: number
  process: number
  _id: string
}

export interface chartData {
  _id: string
  taskname: string
  journal: axis[]
}

console.log(props.chartData)
const xAxis = reactive<string[]>([])
const yAxis = reactive<number[]>([])

for (let i = props.chartData.journal.length - 1; i >= 0; i--) {
  xAxis.push(`${props.chartData.journal[i].month}月`)
  yAxis.push(props.chartData.journal[i].process)
}
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent])

type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;
let option: EChartsOption = reactive({
  xAxis: {
    name: "月份",
    type: 'category',
    data: xAxis
  },
  yAxis: {
    name: "进度",
    type: 'value',
    min: 0,
    max: 100,
    axisLabel: {
      formatter: '{value} %'
    }
  },
  series: [
    {
      data: yAxis,
      type: 'line',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%'
      },
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  }
});
onMounted(() => {
  let chartDom = document.getElementById(props.id)!;
  let myChart = echarts.init(chartDom);
  window.addEventListener("resize", function () {
    myChart.resize()
  })

  option && myChart.setOption(option);
})
</script>
<style lang="less" scoped>
.chart {
  .layout {
    height: 500px;

    .container {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
