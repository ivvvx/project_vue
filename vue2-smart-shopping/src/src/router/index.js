import Vue from 'vue'
import VueRouter from 'vue-router'

import LayOut from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'
import '@/styles/common.less'

const Login = () => import('@/views/login')
const MyOrder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const ProDetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const AddressPage = () => import('@/views/pay/address')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      redirect: '/home',
      component: LayOut,
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/address', component: AddressPage }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 数组存储需要验证token的权限页面
  const authUrls = ['/pay', '/myorder', '/address']
  if (!authUrls.includes(to.path)) {
    // 要访问的页面不在authUrls中，则直接放行，否则验证token
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
