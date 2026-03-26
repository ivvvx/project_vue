import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      // Prettier 规则：自动读取 .prettierrc.json 中的配置
      // 方式1：只设置规则级别，自动读取 .prettierrc.json（推荐）
      // 'prettier/prettier': 'warn',
      // 方式2：如果需要覆盖 .prettierrc.json 的配置，可以这样写：
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 80,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
        }
      ],
      'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
      // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
      'no-undef': 'error'
    }
    // globals: {
    //   ElMessage: 'readonly',
    //   ElMessageBox: 'readonly',
    //   ElLoading: 'readonly'
    // }
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential']
])
