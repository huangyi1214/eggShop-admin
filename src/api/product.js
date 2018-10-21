import request from '@/utils/request'

export function getList(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/productList',
    method: 'post',
    data: params
  })
}
export function create(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/productCreate',
    method: 'post',
    data: params
  })
}
export function update(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/productupdate',
    method: 'post',
    data: params
  })
}