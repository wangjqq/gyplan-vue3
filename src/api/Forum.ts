import { request } from '../utils/request'
// 获取论坛分类列表
export function getForumTypeList() {
  return request({
    url: '/forum/getForumTypeList',
    method: 'get',
  })
}

// 新增帖子
export function addForum(data: any) {
  return request({
    url: '/forum/addForum',
    method: 'post',
    data,
  })
}

// 根据分类获取帖子列表
export function getForumListByType(params: any) {
  return request({
    url: '/forum/getForumListByType',
    method: 'get',
    params,
  })
}

// 获取最新帖子
export function getFreshForum() {
  return request({
    url: '/forum/getFreshForum',
    method: 'get',
  })
}
