<template>
  <div id="persona">
    <el-card class="box-card">
      <div class="card-header">
        <span>个人基本信息</span>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="70px"
        :model="formLabelAlign"
        style="min-width: 300px"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled/>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="form.nick_name" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男" />
            <el-radio label="女" />
            <el-radio label="未知" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" type="textarea"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password/>
        </el-form-item>
        <el-button type="primary" style="width:100%;" @click="handleSave">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
    name: 'PersonaView',
    data(){
      return {
        labelPosition: "left",
        form: {}
      }
    },
    mounted() {
      this.form = {
        ...JSON.parse(sessionStorage.getItem('user'))
      }
    },
    methods: {
      handleSave() { // 保存修改
        request.put('/user/update', this.form)
        .then(res => {
          if(res.status == 500) {
            this.$message({ // 成功提示弹窗
              type: "success",
              message: "更新成功"
            })
          }
          // 更新 sessionstorage
          sessionStorage.setItem('user', JSON.stringify(res.data.user))
        })
      }
    }
}
</script>

<style scoped>
#persona {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-header {
  text-align: center;
  font-size: 20px;
  padding-bottom: 15px
}
</style>