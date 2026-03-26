<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artAddService,
  artGetDetailService,
  artEditService
} from '@/api/article'
import { nextTick } from 'vue'
import { baseURL } from '@/utils/request'
import axios from 'axios'
const visibleDraw = ref(false) // 抽屉显示隐藏
const defaultForm = {
  title: '', //文章标题
  cate_id: '', // 文章分类id
  content: '', // 文章内容
  cover_img: '', // 文章封面
  state: '' // 状态
}
const formModel = ref({ ...defaultForm })
const rules = {}

// 图片上传
const imageUrl = ref('')
const onSelectFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 上传文章的发送请求
// 上传文件的数据格式为 formdata 对象，先转换格式
const emit = defineEmits('success')
const onPublish = async (state) => {
  formModel.value.state = state
  // 转换格式
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // 发请求
  if (formModel.value.id) {
    // 编辑状态
    await artEditService(fd)
    ElMessage.success('修改成功！')
    visibleDraw.value = false
    emit('success', 'edit')
  } else {
    // 添加状态
    await artAddService(fd)
    ElMessage.success('添加成功！')
    visibleDraw.value = false
    // 通知父组件，添加成功后数据在最后，所以渲染列表至最后一页
    emit('success', 'add')
  }
}

// 对外暴露的方法
const eritorRef = ref()
const open = async (row) => {
  visibleDraw.value = true
  //   console.log(row)
  if (row.id) {
    // console.log('编辑状态')
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img
    formModel.value.cover_img = await imageUrlToFile(
      imageUrl.value,
      formModel.value.cover_img
    )
  } else {
    // 重置表单内容 图片文件和富文本要手动重置
    formModel.value = { ...defaultForm }
    imageUrl.value = ''
    await nextTick()
    eritorRef.value.setHTML('')
    console.log('添加')
  }
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
defineExpose({
  open
})
</script>
<template>
  <el-drawer
    :title="formModel.cate_id ? '编辑文章' : '添加文章'"
    v-model="visibleDraw"
    size="45%"
  >
    <el-form :model="formModel" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入标题" v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect
          v-model="formModel.cate_id"
          style="width: 100%"
        ></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="eritorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
