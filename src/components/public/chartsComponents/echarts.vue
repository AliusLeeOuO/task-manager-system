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
import { SVGRenderer } from 'echarts/renderers';
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
  xAxis.push(goBackDate(props.chartData.journal[0].month, i))
  yAxis.push("")
}

for (let i = 0; i < props.chartData.journal.length; i++) {
  let xString = props.chartData.journal[i].month.replace(/\//, "年")
  xAxis.push(`${xString}月`)
  yAxis.push(props.chartData.journal[i].process)
}
echarts.use([GridComponent, LineChart, SVGRenderer, UniversalTransition, TooltipComponent])

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
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%'
      }
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
  width: 100%;
  .layout {
    height: 500px;
    width: 100%;
    .container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
