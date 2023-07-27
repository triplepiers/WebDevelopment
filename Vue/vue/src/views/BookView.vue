<template>
  <div id="book">
    <div class="options">
      <el-button type="primary" @click="showAdd">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <div class="search">
      <el-input v-model="search" placeholder="请输入内容" style="width:20%;" clearable></el-input>
      <el-button type="primary" style="margin-left:5px;" @click="loadData">查询</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%;">
      <el-table-column prop="id" label="ID" sortable/>
      <el-table-column prop="name" label="书名" />
      <el-table-column prop="price" label="价格" sortable/>
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="create_time" label="创建时间" sortable/>
      <el-table-column label="封面">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="确认要删除吗?" @confirm="handleDelete(scope.row.id)">
          <template #reference>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="psize"
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增用户弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="新增书籍"
      width="500px"
      :before-close="handleClose"
    >
      <el-form v-model="form" label-width="120px" >
        <el-form-item label="书名" required>
          <el-input v-model="form.name" style="width:80%"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="form.price" :precision="2" :step="0.01" :max="1000" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" style="width:80%"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="form.create_time" style="width:80%"
           value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="handleUpload"
            ref="myUpload"
          >
            <el-button type="primary" style="width:100%;">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
        
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
    name: 'BookView',
    data() {
    return {
      search: "",
      psize: 5,
      currentPage: 1,
      tableData: [],
      total: 0,
      dialogVisible: false,
      form: {}
    }
  },
  methods: {
    showAdd() { // 显示新增用户弹窗
      this.form = {} // 重置输入
      this.dialogVisible = true
    },
    save() { // 保存修改
        if(this.form.id) {
            request.put('/book/update', this.form)
            .then(res => {
                if(res.status == 500) {
                    this.$message({ // 成功提示弹窗
                        type: "success",
                        message: "更新成功"
                    })
                }
                this.loadData() // 更新数据
            })
        } else { // 无 id - 新增用户
            request.post('/book/add', this.form).then(res => {
                if(res.status == 500) {
                    this.$message({ // 成功提示弹窗
                        type: "success",
                        message: "新建成功"
                    })
                }
                this.loadData() // 更新数据
            })
        }
        
        this.form = {}
        this.$refs.myUpload.clearFiles()
        this.dialogVisible = false
    },
    loadData() { // 加载当前页数据
      request.get('/book/all', {
        params: {
          "page": this.currentPage,
          "size": this.psize,
          "search": this.search
        }
      })
      .then(
        res => {
          this.tableData = res.data.tableData
          this.total = res.data.total
        }
      )
    },
    handleEdit(row) { // 编辑行数据
      this.form = JSON.parse(JSON.stringify(row)) // 避免浅拷贝
      this.dialogVisible = true
    },
    handleSizeChange() { // 分页大小变化
      this.loadData()
    },
    handleCurrentChange() { // 页码变化
      this.loadData()
    },
    handleClose() { // 关闭窗口
      this.form = {}
      this.dialogVisible = false
    },
    handleDelete(id) { // 删除记录
      request.delete('/book/delete/' + id)
      .then( res => {
        if(res.status == 500) {
          this.$message({ // 删除提示弹窗
            type: "success",
            message: "删除成功"
          })
        }
        this.loadData()
      })
    },
    handleUpload(params) {
            var formData = new FormData();
            formData.append("file", params.file); 
            if(this.form.id) {
              formData.append("id", this.form.id)
            }
            request.post('/file/cover', formData)
            .then(
                res => {
                    this.form.cover = res.data
                },
                err => {
                    // console.log(err.message)
                }
            )
        }
  },
  created() { // 页面加载时获取数据
    this.loadData()
  }
}
</script>

<style scoped>
#book {
  width: 100%;
  padding: 10px;
}
#book .options,
#book .pages {
  margin: 10px 0;
}
#book .search {
  margin: 10px 0;
  width: 100%;
}
</style>