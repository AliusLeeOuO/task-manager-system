<template>
  <a-card title="提交材料">
    <div id="form">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{span: 4}"
      >
        <a-form-item ref="schedule" name="schedule" label="进度">
          <a-input-number v-model:value="formState.schedule" style="width: 100%"></a-input-number>
        </a-form-item>
        <a-form-item ref="files" name="files" label="文件">
          <a-upload action="https://quanquan.asia/web/api/upload" method="post" :custom-request="customRequest" multiple
                    v-model:file-list="fileList">
            <a-button>
              <upload-outlined></upload-outlined>
              上传文件
            </a-button>
          </a-upload>
        </a-form-item>


        <a-form-item ref="name" label="Activity name" name="name">
          <a-input v-model:value="formState.name"/>
        </a-form-item>
        <a-form-item label="Activity zone" name="region">
          <a-select v-model:value="formState.region" placeholder="please select your zone">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Activity time" required name="date1">
          <a-date-picker
            v-model:value="formState.date1"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="Instant delivery" name="delivery">
          <a-switch v-model:checked="formState.delivery"/>
        </a-form-item>
        <a-form-item label="Activity type" name="type">
          <a-checkbox-group v-model:value="formState.type">
            <a-checkbox value="1" name="type">Online</a-checkbox>
            <a-checkbox value="2" name="type">Promotion</a-checkbox>
            <a-checkbox value="3" name="type">Offline</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="Resources" name="resource">
          <a-radio-group v-model:value="formState.resource">
            <a-radio value="1">Sponsor</a-radio>
            <a-radio value="2">Venue</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Activity form" name="desc">
          <a-textarea v-model:value="formState.desc"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import {useRoute} from "vue-router";
import {Moment} from 'moment';
import {reactive, ref, toRaw, UnwrapRef} from 'vue';
import {ValidateErrorEntity} from "ant-design-vue/es/form/interface";
import {UploadOutlined} from '@ant-design/icons-vue';
import xhr from "../../xhr"

const route = useRoute()
const taskid = route.params.taskid

let customRequest = (data: any) => {
  console.log(data)
  const formData = new FormData()
  formData.append('files', data.file, data.file.name)
  console.log(formData.get("files"))
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  xhr.post('upload', formData, config)
    .then(config => {
      console.log(config)
    }).catch(err => {
    throw err
    })
}


interface FormState {
  name: string;
  schedule: number | undefined
  region: string | undefined;
  date1: Moment | undefined;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}

const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  schedule: undefined,
  region: undefined,
  date1: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}


const fileList = ref<FileItem[]>([
  // {
  //   uid: '1',
  //   name: 'xxx.png',
  //   status: 'done',
  //   response: 'Server Error 500', // custom error message to show
  //   url: 'http://www.baidu.com/xxx.png',
  // },
  // {
  //   uid: '2',
  //   name: 'yyy.png',
  //   status: 'done',
  //   url: 'http://www.baidu.com/yyy.png',
  // },
  // {
  //   uid: '3',
  //   name: 'zzz.png',
  //   status: 'error',
  //   response: 'Server Error 500', // custom error message to show
  //   url: 'http://www.baidu.com/zzz.png',
  // },
])
console.log(fileList)
const handleChange = ({file, fileList}: FileInfo) => {
  if (file.status !== 'uploading') {
    console.log(file, fileList);
  }
};


const rules = {
  name: [
    {required: true, message: 'Please input Activity name', trigger: 'blur'},
    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
  ],
  region: [{required: true, message: 'Please select Activity zone', trigger: 'change'}],
  date1: [{required: true, message: 'Please pick a date', trigger: 'change', type: 'object'}],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [{required: true, message: 'Please select activity resource', trigger: 'change'}],
  desc: [{required: true, message: 'Please input activity form', trigger: 'blur'}],
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log('error', error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
<style lang="less" scoped>
#form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
