import { request } from '../utils/request'
// 获取所有元器件列表
export function getAllImsList(params: any) {
  return request({
    url: '/api/ims/getAllImsList',
    method: 'get',
    params,
  })
}
// 根据分类获取元器件列表
interface params1 {
  type_id: Number
  id: Number
}

export function getImsListByType(params: params1) {
  return request({
    url: '/api/ims/getImsListByType',
    method: 'get',
    params,
  })
}
// 获取元器件分类列表
export function getTypeList(params: any) {
  return request({
    url: '/api/ims/getTypeList',
    method: 'get',
    params,
  })
}

// 新增元器件分类
export function addItemType(params: any) {
  return request({
    url: '/api/ims/addItemType',
    method: 'post',
    params,
  })
}
// 新增元器件
export function addItem(params: any) {
  return request({
    url: '/api/ims/addItem',
    method: 'post',
    params,
  })
}
