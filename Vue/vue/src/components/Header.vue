<template>
  <div class="header">
    <div class="title">后台管理</div>
    <div class="blank"></div>
    <div class="list">
        <el-dropdown>
            <span class="el-dropdown-link">
            {{ cur_user ? u_name : ''}}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="this.$router.push('/me')">个人信息</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'

export default {
    name: 'Header',
    components: {
        ArrowDown
    },
    methods: {
        handleLogout() {
            sessionStorage.removeItem('user')
            this.$router.replace('/login')
        }
    },
    computed: {
        cur_user() {
            return JSON.parse(sessionStorage.getItem('user'))
        },
        u_name() {
            if(this.cur_user.role === 1) return '普通用户 - ' + this.cur_user.username
            else                         return '管理员 - ' + this.cur_user.username
        }
    }
}
</script>

<style scoped>
.header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
}
.header .title {
    width: 200px;
    padding-left: 30px;
    font-weight: bold;
    color: var(--green);
}
.header .blank {
    flex: 1;
}
.header .list {
    width: 140px;
    display: flex;
    align-items: center;
}
el-dropdown {
    border: none;
}
</style>