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
      data: ['南职七训一楼','南职七训二楼','南职七训三楼','南职七训四楼','南职八训一楼','南职八训二楼',]
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
