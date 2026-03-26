import { delSelect, getCartList, updateCount } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 将请求回来的购物车列表存到 cartList 中
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 修改复选框的值
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 点击全选按钮同步更新所有小选框的状态
    toggleAllCheck (state, flag) {
      return state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    // 将修改后的商品数量先同步到本地
    changeCount (state, { id, num }) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.goods_num = num
    }
  },
  actions: {
    async getCartAsync (context) {
      const { data } = await getCartList()
      // 给商品添加 isChecked 属性，默认购物车中的商品是选中的
      data.list.forEach((item) => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAsync (context, { id, num, skuId }) {
      // 先本地同步
      context.commit('changeCount', { id, num })
      // 再更新到后台
      await updateCount(id, num, skuId)
    },
    async delSelectAsync (context) {
      const cartIds = context.getters.selGoods.map(item => item.id)
      await delSelect(cartIds)
      Toast.success('删除商品成功')

      // 重新拉取购物车数据
      context.dispatch('getCartAsync')
    }
  },
  getters: {
    // 统计商品总数
    goodsTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selGoods (state) {
      return state.cartList.filter((item) => item.isChecked)
    },
    // 统计选中的商品总数
    selCount (state, getters) {
      return getters.selGoods.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 统计选中的商品总价
    selPrice (state, getters) {
      return getters.selGoods.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 判断所有商品是否都选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }

  }
}
