<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="4"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="" />
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="msgCode" />
          <button @click="getCode">
            {{
              second === totalSecond ? "获取验证码" : second + "秒后重新发送"
            }}
          </button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'

export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 用户自己输入的图形验证码
      mobile: '15751776629', // 用户输入的手机号: 15751776629
      picKey: '', // 请求到的图形验证码的唯一标识
      picUrl: '', // 请求到的图形验证码地址
      totalSecond: 60, // 倒计时总秒数
      second: 60, // 倒计时的变化秒数
      timer: null, // 定时器id
      msgCode: '' // 用户输入的短信验证码:246810
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {

    // 获取图形验证码
    async getPicCode () {
      const {
        data: { base64, key }
      } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
      this.$toast('获取图形验证码成功')
    },

    // 获取短信验证码
    async getCode () {
      if (!this.vaildFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功，注意查收')
        // console.log(res)

        // 开启定时器
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },

    // 登录
    async login () {
      if (!this.vaildFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      // console.log('发送登录请求')
      this.$store.commit('user/setUserInfo', res.data)
      // console.log(this.$store.state.user)
      this.$toast.allowMultiple()
      this.$toast.success('登录成功')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    },

    // 校验函数
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    }

  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
