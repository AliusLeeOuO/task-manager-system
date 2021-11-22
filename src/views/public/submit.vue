<template>
  <card title="提交材料">
    <div id="form">
      <div>
        <h3>提交材料到 {{ taskName }}</h3>
      </div>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{span: 4}"
      >
        <a-form-item ref="schedule" name="schedule" label="进度">
          <a-input-number v-model:value="formState.schedule"></a-input-number>
          %
        </a-form-item>
        <a-form-item ref="describe" name="describe" label="任务描述">
          <a-input v-model:value="formState.describe"></a-input>
        </a-form-item>
        <a-form-item ref="files" name="files" label="文件">
          <a-upload action="https://quanquan.asia/web/api/upload"
                    method="post"
                    :custom-request="customRequest"
                    multiple
                    v-model:file-list="fileList"
                    :remove="removeChange"
                    @change="handleChange">
            <a-button>
              <upload-outlined></upload-outlined>
              上传文件
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
      </a-form>
    </div>
  </card>
</template>
<script lang="ts" setup>
import {useRoute,useRouter} from "vue-router";
import {Moment} from 'moment';
import {reactive, ref, toRaw, UnwrapRef} from 'vue';
import {RuleObject, ValidateErrorEntity} from "ant-design-vue/es/form/interface";
import {UploadOutlined} from '@ant-design/icons-vue';
import xhr from "../../xhr"
import Card from "../../components/public/card.vue"
import {message} from "ant-design-vue";
import Cookies from "js-cookie";


const route = useRoute()
const router = useRouter()
const taskid = route.params.taskid

let taskName = ref<string>("任务")
xhr.get(`dean/getTask/${taskid}`).then(({data}) => {
  taskName.value = data.data[0].taskname
}).catch(err => {
  throw err
})

let customRequest = (data: any) => {
  const {onSuccess, onError, file, onProgress} = data;
  console.log(data, 4)
  const formData = new FormData()
  formData.append('files', data.file, data.file.name)
  console.log(formData.get("files"))
  let config = {
    headers: {'Content-Type': 'multipart/form-data'},
    onUploadProgress: (event: any) => {
      console.log((event.loaded / event.total) * 100);
      onProgress({percent: (event.loaded / event.total) * 100}, file);
    }
  }
  xhr.post('upload', formData, config)
    .then(({data}) => {
      const response = data.data[0]
      formState.file.push(response)
      onSuccess(file)
    }).catch(err => {
    const error = new Error('Some error');
    onError({event: error});
    throw err
  })
  console.log(data, 1)
}


interface FormState {
  name: string;
  schedule?: number
  describe?: string
  file: any
}

const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  schedule: undefined,
  describe: '',
  file: []
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


const fileList = ref<FileItem[]>([])
const handleChange = ({file, fileList}: FileInfo) => {
  if (file.status !== 'uploading') {
    console.log(file, fileList);
  }
};


const removeChange = (file: any) => {
  message.info("暂不支持删除")
  console.log(file)
  return false
}

const validatorSchedule = async function (rule: RuleObject, value: number) {
  if (!value) {
    return Promise.reject("请输入进度")
  }
  return Promise.resolve()
}

const validatorFile = async function () {
  if (formState.file.length === 0) {
    return Promise.reject("请上传文件！")
  }
  return Promise.resolve()
}
const rules = {
  schedule: [
    {required: true, validator: validatorSchedule, trigger: 'blur'}
  ],
  describe: [
    {required: true, message: "请填写描述", trigger: "blur"}
  ],
  files: [
    {required: true, validator: validatorFile, trigger: "blur"}
  ]
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
      xhr.post(`major/referTask/${taskid}`,{
        process: formState.schedule,
        userId: Cookies.get("id"),
        describe: formState.describe,
        files: formState.file
      }).then(({data}) => {
        console.log(data)
        if (data.status === 200) {
          router.push({
            path: "/success",
            params: {
              title: "提交进度成功！"
            }
          })
        }
      }).catch(err => {
        throw err
      })
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
