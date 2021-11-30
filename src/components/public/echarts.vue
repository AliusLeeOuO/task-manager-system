<template>
  <a-card class="chart" :title="props.chartData.taskname">
    <div class="layout">
      <div :id="props.id" class="container" ref="container"></div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption, TooltipComponent } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, reactive } from "vue";

const props = defineProps<{
  id: string
  chartData: chartData
}>()

interface axis {
  month: string
  process: number
  _id: string
}

export interface chartData {
  _id: string
  taskname: string
  journal: axis[]
}

const xAxis = reactive<string[]>([])
const yAxis = reactive<(string | number)[]>([])
console.log()
for (let i = 12 - props.chartData.journal.length; i > 0; i--) {
  function goBackDate(dateStr: string, gobackMonth: number) {
    let year = +dateStr.slice(0, 4)
    let month = +dateStr.slice(5)
    for (let i = 0; i < gobackMonth; i++) {
      if (month === 1) {
        month = 12
        year--
      } else {
        month--
      }
    }
    return `${year}年${month}月`
  }

  xAxis.push(goBackDate(props.chartData.journal[props.chartData.journal.length - 1].month, i))
  yAxis.push("")
}
for (let i = props.chartData.journal.length - 1; i >= 0; i--) {
  let xString = props.chartData.journal[i].month.replace(/\//, "年")
  xAxis.push(`${xString}月`)
  yAxis.push(props.chartData.journal[i].process)
}
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent])

type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;
let option: EChartsOption = reactive({
  xAxis: {
    name: "月份",
    type: 'category',
    data: xAxis,
    min: 0,
    max: 11,
    axisLabel: {
      interval: 0,
      rotate: 40
    }
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
      // animation: false
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
        // formatter: '{c}%'
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
