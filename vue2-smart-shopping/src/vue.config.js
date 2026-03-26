const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/project_vue/vue2-smart-shopping/' // 生产环境用这个路径
    : '/' // 开发环境保持根路径
})
