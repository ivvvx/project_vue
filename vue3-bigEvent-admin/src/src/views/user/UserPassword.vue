<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdatePasswordService } from '@/api/user'
import router from '@/router'
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const rules = {
  old_pwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    {
      min: 6,
      max: 15,
      message: '旧密码长度必须在6到15位之间',
      trigger: 'blur'
    },
    { pattern: /^\S+$/, message: '旧密码不能包含空格', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      min: 6,
      max: 15,
      message: '新密码长度必须在6到15位之间',
      trigger: 'blur'
    },
    { pattern: /^\S+$/, message: '新密码不能包含空格', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formModel.value.old_pwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      min: 6,
      max: 15,
      message: '确认密码长度必须在6到15位之间',
      trigger: 'blur'
    },
    { pattern: /^\S+$/, message: '确认密码不能包含空格', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.new_pwd) {
          callback(new Error('新密码和确认密码必须一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const formRef = ref(null)
const userStore = useUserStore()
const submitForm = async () => {
  await formRef.value.validate()
  await userUpdatePasswordService(formModel.value)

  ElMessage.success('重置密码成功')
  userStore.removeUserInfo()
  userStore.setToken('')
  router.push('/login')
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <PageContainer title="重置密码">
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="120px"
    >
      <el-form-item label="旧密码" prop="old_pwd">
        <el-input v-model="formModel.old_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="formModel.new_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="formModel.re_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改密码</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>
