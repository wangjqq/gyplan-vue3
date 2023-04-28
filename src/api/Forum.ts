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

// 根据id获取帖子内容
export function getForumContentById(params: any) {
  return request({
    url: '/forum/getForumContentById',
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

// 获取最新回复
export function getFreshReply() {
  return request({
    url: '/forum/getFreshReply',
    method: 'get',
  })
}

// 回复帖子
export function replyForum(data: any) {
  return request({
    url: '/forum/replyForum',
    method: 'post',
    data,
  })
}

// 查看帖子
export function viewForum(data: any) {
  return request({
    url: '/forum/viewForum',
    method: 'post',
    data,
  })
}

// 点赞帖子
export function likesForum(data: any) {
  return request({
    url: '/forum/likesForum',
    method: 'post',
    data,
  })
}

// 获取帖子回复列表
export function getForumReplyList(params: any) {
  return request({
    url: '/forum/getForumReplyList',
    method: 'get',
    params,
  })
}

// 删除帖子
export function delForum(data: any) {
  return request({
    url: '/forum/delForum',
    method: 'post',
    data,
  })
}

// 删除回复
export function delReply(data: any) {
  return request({
    url: '/forum/delReply',
    method: 'post',
    data,
  })
}
