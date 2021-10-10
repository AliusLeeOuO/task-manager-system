<template>
  <a-card :title="`提交任务`">

    <div id="form">
      <div>
        <h2>任务标题任务标题任务标题任务标题任务标题任务标题任务</h2>
        <p>任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介任务简介</p>
        <p>当前提交：{{route.query.taskName}}</p>
      </div>
      <a-form :label-col="labelCol" :rules="rules">
        <a-form-item ref="schedule" name="schedule" label="提交进度">
          <a-input-number :min="0" :max="100" /> %
        </a-form-item>
        <a-form-item label="文件">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" v-model:file-list="fileList">
            <a-button>
              <upload-outlined></upload-outlined>
              上传材料
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item  :wrapper-col="{ span: 14, offset: 3 }">
          <a-button type="primary">修改任务</a-button>
          <a-button>返回</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { UploadOutlined } from '@ant-design/icons-vue';
import { useRoute } from "vue-router";
const route = useRoute()
// 任务标识
// console.log(route.query.taskName)




interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

const fileList = ref<FileItem[]>([
  {
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
  {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  },
]);

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}


const handleChange = ({ file, fileList }: FileInfo) => {
  if (file.status !== 'uploading') {
    console.log(file, fileList);
  }
};


const labelCol = {
  style: {
    width: "80px"
  }
}
const rules = {
  schedule: [
    { required: true, message: '请输入进度', trigger: 'blur' }
  ]
}
</script>
<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
