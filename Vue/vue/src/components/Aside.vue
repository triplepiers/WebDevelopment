<template>
  <div id="aside">
    <el-menu
        style="min-height: calc(100vh - 50px);"
        default-active="$route.path"
        router
        class="el-menu-vertical-demo"
    >
      <el-sub-menu index="1" v-if="role === 2">
        <template #title>
          <el-icon><Tools /></el-icon>
          <span>系统管理</span>
        </template>
          <el-menu-item index="user">
            <el-icon><User /></el-icon>
            用户管理
          </el-menu-item>
          <el-menu-item index="book">
            <el-icon><DocumentAdd /></el-icon>
            书籍管理
          </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="upload">
        <el-icon><UploadFilled /></el-icon>
        文件上传
      </el-menu-item>
      <el-menu-item index="text">
        <el-icon><BrushFilled /></el-icon>
        富文本
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { Tools, User, DocumentAdd, UploadFilled, BrushFilled } from '@element-plus/icons-vue'

export default {
    name: 'Aside',
    components: {
      Tools,
      User,
      DocumentAdd,
      UploadFilled,
      BrushFilled
    },
    computed: {
      role() {
        return JSON.parse(sessionStorage.getItem('user')).role
      }
    }
}
</script>

<style scoped>
el-menu {
  width: 200px;
}
</style>