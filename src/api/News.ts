import { request } from '../utils/request'
// 获取所有元器件列表
export function getAllNewsList() {
  return request({
    url: '/news/getAllNewsList',
    method: 'get',
  })
}
