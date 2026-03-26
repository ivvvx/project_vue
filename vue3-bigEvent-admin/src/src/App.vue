<script setup>
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <!-- 一级路由出口 -->
  <el-config-provider :locale="zhCN">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
