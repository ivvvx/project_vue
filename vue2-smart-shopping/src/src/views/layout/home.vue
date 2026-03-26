<template>
  <div class="home">
    <!-- 头部标题 -->
    <div class="header">
      <h3>智慧商城</h3>
    </div>

    <!-- 搜索框 -->
    <div class="search">
      <van-search
        background="#f1f1f2"
        placeholder="请输入搜索关键词"
        shape="round"
        @click="$router.push('/search')"
      />
    </div>

    <!-- 轮播图 -->
    <div class="slideshow">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
          <img v-lazy="image.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 列表宫格 -->
    <div class="list">
      <ul>
        <li v-for="(item, index) in navList" :key="index" @click="$router.push('/category')">
          <img :src="item.imgUrl" alt="" />
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>

    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="" />
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/goodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomeIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      bannerList: '', // 图片轮播
      navList: '', // 导航
      proList: '' // 商品
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
    // console.log(this.proList)
  }
}
</script>

<style lang="less" scoped>
.home {
  .header {
    background-color: #be2000;
    height: 40px;
    h3 {
      color: #ebd0ba;
      text-align: center;
      line-height: 40px;
      font-weight: normal;
    }
  }
  .slideshow {
    height: 180px;
    overflow: hidden;
    :deep(.van-swipe) {
      height: 100%;
    }
    :deep(.van-swipe-item) {
      height: 100%;
    }
    :deep(.van-swipe__indicator--active) {
      background-color: white;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }
  .list {
    padding: 15px;
    ul {
      display: flex;
      flex-wrap: wrap;
      // 使用gap统一控制行列间距，更简洁
      gap: 20px 0;
      // 使用space-between确保每行5个均匀分布
      justify-content: space-between;
      li {
        // 精确计算：每个item宽度 = (100% - 4个间距) / 5
        // 假设间距通过justify-content自动分配，使用约18%宽度
        // 或者使用calc精确计算：width: calc((100% - 4 * 间距) / 5)
        flex: 0 0 calc(20% - 4px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // 添加分割线：左右相邻（排除每行最后一个）
        &:not(:nth-child(5n)) {
          border-right: 1px solid #eee;
        }
        // 添加分割线：上下相邻（只给第一行）
        &:nth-child(-n + 5) {
          border-bottom: 1px solid #eee;
        }
        img {
          width: 45px;
          height: 45px;
          object-fit: cover;
          margin-bottom: 8px;
        }
        span {
          font-size: 11px;
          color: #333;
          text-align: center;
        }
      }
    }
  }
  // 主会场
  .main img {
    display: block;
    width: 100%;
  }

  // 猜你喜欢
  .guess .guess-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
  }
}
</style>
