<template>
  <div id="upload">
   <div class="card">
     <el-upload
        class="upload-demo"
        drag
        :http-request="handleUpload"
        multiple
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
        <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
        </div>
        </template>
    </el-upload>
   </div>
  </div>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'
import request from '@/utils/request'

export default {
    name: 'UploadView',
    components: {
        UploadFilled
    },
    methods: {
        handleUpload(params) {
            var formData = new FormData();
            formData.append("file", params.file); 
            request.post('/file/upload', formData)
            .then(
                res => {
                    // console.log(res.data)
                },
                err => {
                    // console.log(err.message)
                }
            )
        }
    }
}
</script>

<style scoped>
#upload {
    flex: 1;
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    width: fit-content;
}
</style>