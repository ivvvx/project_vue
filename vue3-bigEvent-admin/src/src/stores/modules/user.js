import { userGetInfoSevice } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const userInfo = ref()
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const getInfo = async () => {
      const res = await userGetInfoSevice()
      userInfo.value = res.data.data
    }
    const removeUserInfo = () => {
      userInfo.value = {}
    }
    return {
      token,
      setToken,
      removeToken,
      getInfo,
      userInfo,
      removeUserInfo
    }
  },
  {
    persist: true
  }
)
