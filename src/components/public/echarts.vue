<template>
  <div class="container" ref="container"></div>
</template>
<script lang="ts" setup>
import {ref, onMounted, watch, toRefs} from "vue";
import * as echarts from "echarts";
import {EChartOption} from 'echarts'

const props = defineProps<{
  options: EChartOption
}>();
const {options} = toRefs(props);
const container = ref<any>(null);
const chart = ref<any>(null);

onMounted(() => {
  chart.value = echarts.init(container.value);
  chart.value.setOption(props.options);
});
watch(
  options,
  (newOptions) => {
    chart.value.setOption(newOptions);
  },
  {deep: true}
);
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
