<template>
  <div id="login">
    <div class="nav">
        还没有账号，<router-link to="/reg" style="text-decoration: none;color:rgb(248, 104, 128);">前往注册页面</router-link>
    </div>
    <div class="card">
        <div class="title">欢迎登录</div>
        <el-form
            ref="form"
            :label-position="labelPosition"
            label-width="0px"
            :model="form"
            :rules="rules"
            style="min-width: 300px"
            size="normal"
        >
            <el-form-item prop="username">
                <div class="tag">用户名</div>
                <el-input v-model="form.username" clearable>
                    <template #prefix>
                        <el-icon class="el-input__icon"><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item style="margin-top: -5px;" prop="password">
                <div class="tag">密码</div>
                <el-input v-model="form.password" clearable show-password>
                    <template #prefix>
                        <el-icon class="el-input__icon"><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item style="margin-top: 30px;">
                <el-button type="primary" style="width:100%;" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'
import request from '@/utils/request'

export default {
    name: 'Login',
    data() {
        return {
            labelPosition: 'left',
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: {required: true, message: "请输入用户名", trigger: 'blur'},
                password: {required: true, message: "请输入密码", trigger: 'blur'}
            }
        }
    },
    components: {
        User,
        Lock
    },
    methods: {
        handleLogin() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    request.post("/user/login", this.form)
                    .then(
                        res => {
                            if(res.status == 500) {
                                this.$message({
                                    type: "success",
                                    message: "登录成功"
                                })
                                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                                this.form = {}
                                this.$router.push('/me')
                            } else {
                                this.form.password = ""
                                this.$message({
                                    type: "error",
                                    message: "用户名或密码错误"
                                })
                            }
                        }
                    )
                } else {
                    this.$message({
                        type: "warning",
                        message: "缺少必要信息"
                    })
                }
            })
        }
    }
}
</script>

<style>
#login {
    width: 100%;
    min-height: 100vh;
    background-color: darkslateblue;
    display: flex;
    align-items: center;
    justify-content: center;
}
.card {
    height: fit-content;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title {
    width: fit-content;
    color: #fff;
    font-size: 30px;
}
.tag {
    color: #aaa;
    font-size: 10px;
    padding-left: 2px;
}
.nav {
    position: absolute;
    left: 20px;
    top: 10px;
    color: #aaa;
}
</style>