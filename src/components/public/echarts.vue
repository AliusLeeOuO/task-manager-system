<template>
  <div class="container" ref="container"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, toRefs } from "vue";
import * as echarts from "echarts";
const props = defineProps<{
  options: {
    type: Object,
    default: {},
    required: true,
  },
}>();
const { options } = toRefs(props);
const container = ref(null);
const chart = ref(null);
onMounted(() => {
  (chart.value as any) = echarts.init((container.value as any));
  // @ts-ignore
  chart.value.setOption(props.options);
});
watch(
  options,
  (newOptions) => {
    (chart.value as any).setOption(newOptions);
  },
  { deep: true }
);
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
