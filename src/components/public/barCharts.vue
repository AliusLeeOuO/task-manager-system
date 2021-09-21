<template>
  <div>
    <Echarts :options="data"></Echarts>
  </div>

</template>
<script lang="ts" setup>
  import Echarts from "./echarts.vue"
  const data:any = {
    xAxis: [{
      type: 'category',
      data: ['计算机应用技术','计算机网络技术','计算机毁灭技术','计算机再生技术','计算机自爆技术','计算机没有技术',]
    }],
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter:'{value} %'
      }
    },
    tooltip: {
      show: true,
      formatter (params:any) {
        console.log(params)
        return `${params.name}: ${params.data}%`
      }
    },
    series: [{
      data: [40,100,30,39,29,20],
      type: "bar"
    }],
  }
</script>
<style lang="less" scoped>
div {
  height: 500px
}
</style>
