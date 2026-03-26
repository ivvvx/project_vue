<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { artDelService } from '@/api/article'
const articleList = ref([])
const total = ref(0)
const loading = ref(false)
const articleEditRef = ref()

// 请求参数数据
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 获取文章列表
const getarticleList = async () => {
  loading.value = true
  const { data } = await artGetListService(params.value)
  // console.log(data)
  articleList.value = data.data
  total.value = data.total
  loading.value = false
}

getarticleList()

// 编辑文章逻辑
const onEditManage = (row) => {
  articleEditRef.value.open(row)
}

//  添加文章
const onAddArticle = (row) => {
  articleEditRef.value.open(row)
}

// 删除文章逻辑
const onDelManage = async (row) => {
  await artDelService(row.id)
  ElMessage.success('删除成功')
  getarticleList()
}

// 当前页变化
const onCurrentChange = (page) => {
  // console.log('当前页：', page)
  params.value.pagenum = page
  getarticleList()
}

// 每页条数变化
const onSizeChange = (size) => {
  // 从第一页重新渲染
  params.value.pagenum = 1
  // 基于最新的每页条数
  params.value.pagesize = size
  getarticleList()
}

// 搜索按钮
const onSearch = () => {
  params.value.pagenum = 1
  getarticleList()
}

// 重置按钮
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''

  getarticleList()
}

// 添加 / 编辑 文章成功后的逻辑
const onSuccess = (type) => {
  // 根据 type 判断是添加还是编辑
  if (type === 'add') {
    // 添加成功，计算最后一页的页数，重新渲染
    // 添加成功后后台的数据已经更改，所以此时计算时手动将 total + 1
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getarticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!--  头表单 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 220px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditManage(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelManage(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next "
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 添加/编辑的抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
