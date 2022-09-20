import Cookies from 'js-cookie'

const TokenKey = "token";

// //获取token
export function getToken() {
  return Cookies.get(TokenKey);
}

// //设置token,写入浏览器
export function setToken(token: any) {
  return Cookies.set(TokenKey, token);
}

//删除token
export function removeToken() {
  return Cookies.remove(TokenKey);
}
