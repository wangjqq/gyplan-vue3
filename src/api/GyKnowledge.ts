import { request } from '../utils/request'
// 获取知识列表
export function getKnowledgeList() {
  return request({
    url: '/api/knowledge/getKnowledgeList',
    method: 'get',
  })
}
// 获取数据结构/算法列表
export function getDataStructureList(params: any) {
  return request({
    url: '/api/knowledge/getDataStructureList',
    method: 'get',
    params,
  })
}
// 获取数据结构/算法知识点分类列表
export function getDataStructureKeyTypeList() {
  return request({
    url: '/api/knowledge/getDataStructureKeyTypeList',
    method: 'get',
  })
}
// 新增数据结构/算法知识点分类
export function addDataStructureKeyType(params: any) {
  return request({
    url: '/api/knowledge/addDataStructureKeyType',
    method: 'post',
    params,
  })
}
// 新增数据结构/算法的题目/知识点
export function addDataStructure(params: any) {
  return request({
    url: '/api/knowledge/addDataStructure',
    method: 'post',
    params,
  })
}
