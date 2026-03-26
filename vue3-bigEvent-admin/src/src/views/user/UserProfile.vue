<script setup>
// import { PageContainer } from '@/components/PageContainer.vue'
import { userUpdateInfoService } from '@/api/user'
import { useUserStore } from '@/stores'
const {
  userInfo: { username, id, nickname, email },
  getInfo
} = useUserStore()
import { ref } from 'vue'
const formModel = ref({
  username,
  nickname,
  email,
  id
})
const rules = ref({
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
      message: '昵称只能包含字母、数字和中文',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      pattern:
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
      message: '请输入正确的邮箱格式',
      trigger: 'blur'
    }
  ]
})
const formRef = ref(null)
const submitForm = async () => {
  await formRef.value.validate()
  // const { id, nickname, email } = formModel.value
  await userUpdateInfoService(formModel.value)
  await getInfo()
  ElMessage.success('更新成功')
}
</script>
<template>
  <PageContainer title="基本资料">
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="120px"
    >
      <el-form-item label="登录名称" prop="username">
        <el-input
          v-model="formModel.username"
          disabled
          style="width: 40%"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname" style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email" style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="width: 100px"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </PageContainer>
</template>
