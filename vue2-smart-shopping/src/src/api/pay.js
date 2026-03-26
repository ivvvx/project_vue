import request from '@/utils/request'

export const payPage = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10, // 快递方式
      couponId: 0, // 优惠卷id
      isUsePoints: 0, // 是否使用积分
      ...obj
    }
  })
}
// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode, // cart buyNow
    delivery: 10, // 快递方式
    couponId: 0, // 优惠卷id
    isUsePoints: 0, // 是否使用积分
    ...obj
  })
}
// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
