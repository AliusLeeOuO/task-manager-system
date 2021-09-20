<template>
  <a-card title="新建 任务/子任务">
    <div id="form">
      <a-form :label-col="labelCol" :rules="rules">
        <a-form-item ref="fatherTask" label="选择父任务">
          <a-cascader :options="options" placeholder="请选择父任务" />
        </a-form-item>
        <a-form-item ref="fatherTaskName" label="任务名称">
          <a-input placeholder="请输入任务名称" />
        </a-form-item>
        <a-form-item ref="fatherTaskSchedule" label="任务占比">
          <a-input-number :min="0" :max="100" /> % （顶级任务请留空）
        </a-form-item>
        <a-form-item ref="fatherTaskFinishTime" label="开始/结束日期">
          <a-range-picker
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['开始时间', '结束时间']"
            @change="onChange"
            @ok="onOk"
          />
        </a-form-item>
        <a-form-item ref="fatherTaskUser" label="派发给">
          <a-select
            show-search
            placeholder="选择派发对象"
            :options="selectOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          >
          </a-select>
        </a-form-item>
        <a-form-item  :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary">提交</a-button>
          <span style="margin-left: 5px;"></span>
          <a-button>切换到修改任务</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SelectTypes } from 'ant-design-vue/es/select';
import { Moment } from 'moment';
interface Option {
  value: string;
  label: string;
  children?: Option[];
}
const options: Option[] = [
  {
    value: '南职七训一元一平南职七训一元一平南职七训一元一平南职七训一元一平南职七训一元一平南职七训一元一平',
    label: '南职七训一元一平',
    children: [
      {
        value: '南职七训四楼一元一平南职七训四楼一元一平南职七训四楼一元一平南职七训四楼一元一平南职七训四楼一元一平',
        label: '南职七训四楼一元一平'
      },
      {
        value: '南职七训三楼一元一平南职七训三楼一元一平南职七训三楼一元一平南职七训四楼一元一平南职七训三楼一元一平',
        label: '南职七训三楼一元一平'
      },
    ],
  }
];

// const fatherTaskName = ref<string>('')

const onChange = (value: Moment[], dateString: string[]) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value: Moment[]) => {
  console.log('onOk: ', value);
};

const selectOption = ref<SelectTypes['options']>([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
]);
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log('blur');
};
const handleFocus = () => {
  console.log('focus');
};



const labelCol = {
  style: {
    width: "100px"
  }
}
const rules = {

}
</script>
<style lang="less" scoped>
 #form {
   margin: 0 auto;
   max-width: 600px;
 }
</style>
