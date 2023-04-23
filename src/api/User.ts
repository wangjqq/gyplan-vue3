import { request } from '../utils/request'

// 注册
export function Reguser(data: any) {
  return request({
    method: 'post',
    url: <string>'/user/reguser',
    data,
  })
}

// 登录
export function Login(data: any) {
  return request({
    method: 'post',
    url: <string>'/user/login',
    data,
  })
}

// 获取图形验证码
export function getCaptacha() {
  return request({
    method: 'get',
    url: <string>'/user/captcha',
    // responseType: 'blob'
  })
}

// 获取短信验证码
export function getMsg(data: any) {
  return request({
    method: 'post',
    url: <string>'/user/aliyun/sendSms',
    data,
  })
}

// 获取用户是否登录
export function isLogin() {
  return request({
    method: 'get',
    url: <string>'/user/islogin',
  })
}

// 退出登录
export function logOut() {
  return request({
    method: 'post',
    url: <string>'/user/logout',
  })
}

// 修改信息
export function setUserInfo(data: any) {
  return request({
    method: 'post',
    url: <string>'/user/setUserInfo',
    data,
  })
}
