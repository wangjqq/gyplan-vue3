import { request } from "../utils/request";

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

// 获取验证码
export function getCaptacha() {

    return request({
        method: 'get',
        url: <string>'/user/captcha',
        // responseType: 'blob'
    })
}

//获取用户收藏列表
export function getCollectList(params: any) {

    return request({
        method: 'get',
        url: <string>'/CollectPlay/getCollectList',
        params,
    })
}