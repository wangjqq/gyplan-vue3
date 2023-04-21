import { request } from '../utils/request'
// 获取所有新闻列表
export function getAllNewsList() {
  return request({
    url: '/news/getAllNewsList',
    method: 'get',
  })
}

// 根据id获取新闻详情
export function getNewContentById(params: any) {
  return request({
    url: '/news/getNewContentById',
    method: 'get',
    params,
  })
}
