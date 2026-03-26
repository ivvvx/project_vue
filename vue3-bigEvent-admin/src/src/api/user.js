import request from '@/utils/request'
// 注册
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', {
    username,
    password,
    repassword
  })
// 请求
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 获取个人信息
export const userGetInfoSevice = () => request.get('/my/userinfo')
// 更新用户信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })
// 更新用户头像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })
// 更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd
  })
