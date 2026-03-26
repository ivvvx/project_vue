// 约定一个公共键名
const INFO_KEY = 'userInfo_key'
const HISTORY_KEY = 'history_key'
const ADDRESS_LIST = 'address_list'

// 获取个人信息
export const getInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {

}
// 获取搜索历史
export const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索历史
export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
// 获取地址列表
export const getAddressList = () => {
  const res = localStorage.getItem(ADDRESS_LIST)
  return res ? JSON.parse(res) : []
}
// 存放地址列表
export const setAddressList = (list) => {
  localStorage.setItem(ADDRESS_LIST, JSON.stringify(list))
}
