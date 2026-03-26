<template>
<div class="main">
    <div class="btn">
        <button @click="handleSub" :disabled="value <= 1">-</button>
    </div>
    <input :value="value" type="text" @change="handleChange">
    <div class="btn">
        <button @click="handleAdd">+</button>
    </div>
</div>
</template>

<script>
export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value // 转数字处理
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        this.$toast('请合理输入')
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
    display: flex;
    gap: 5px;
    .btn button {
        width: 25px;
        height: 25px;
        border: none;
        background-color: #eeeeee;
        transition: all 0.2s ease;
    }
    .btn button:active {
        transform: scale(0.95); /* 缩放到原尺寸的95%，可调整数值（如0.9） */
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    input {
        border: none;
        outline: none;
        width: 30px;
        height: 25px;
        background-color: #eeeeee;
        line-height: 25px;
        text-align: center;
    }
}
</style>
