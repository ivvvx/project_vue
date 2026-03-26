<template>
  <div class="main">
    <van-nav-bar fixed title="地址管理" left-arrow @click-left="$router.go(-1)" />
    <!-- 主体部分 -->
    <div class="content">
        <!-- 地址块 -->
        <div class="box" v-for="item in addressList" :key="item.address_id">
            <div class="info">
                <span>{{ item.name }}</span>
                <span>{{ item.phone }}</span>
            </div>
            <div class="address">
                <span>{{ item.region.province }}-{{ item.region.city }}-{{ item.region.region }}-{{ item.detail }}</span>
            </div>
            <div class="sett">
                <div class="def">
                    <van-radio-group :value="item.isSelect">
                        <van-radio name="1">选择</van-radio>
                    </van-radio-group>
                </div>
                <div class="right">
                    <span><van-icon name="edit" />编辑</span>
                    <span><van-icon name="delete-o" />删除</span>
                </div>
            </div>
        </div>

    </div>

    <!-- 底部 -->
    <div class="footer">
        <button>添加新地址</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddressPage',
  data () {
    return {
      isSelect: true
    }
  },
  computed: {
    ...mapState('address', ['addressList'])
  },
  created () {
    this.$store.dispatch('address/getAddressAs')
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  padding: 46px 10px 60px;
  background-color: #fafafa;

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .box {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 10px 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        color: #333;

        span:first-child {
          font-weight: 500;
        }

        span:last-child {
          font-size: 14px;
          color: #666;
        }
      }

      .address {
        margin-top: 4px;
        padding-right: 8px;
        font-size: 13px;
        line-height: 1.5;
        color: #666;
        word-break: break-all;
      }

      .sett {
        margin-top: 8px;
        padding-top: 6px;
        border-top: 1px solid #f2f2f2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #666;

        .def {
          display: flex;
          align-items: center;
        }

        .right {
          display: flex;
          align-items: center;
          gap: 12px;

          span {
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 52px;
    padding: 6px 0;
    border-top: 1px solid #eee;
    background-color: #fff;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.03);

    button {
      display: block;
      margin: 0 auto;
      border: none;
      width: 92%;
      height: 40px;
      border-radius: 20px;
      background-image: linear-gradient(to right, #ff4b2b, #ff7a00);
      color: #fff;
      font-size: 14px;
      letter-spacing: 2px;
    }
  }
}
</style>
