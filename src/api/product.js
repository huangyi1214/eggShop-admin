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
export function getproductbytype(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/getproductbytype',
    method: 'post',
    data: params
  })
}
export function createproductType(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/createproductType',
    method: 'post',
    data: params
  })
}
export function updatetypestatus(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/updateproductTypestatus',
    method: 'post',
    data: params
  })
}

export function updateproductTypefee(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/updateproductTypefee',
    method: 'post',
    data: params
  })
}
//updateproductTypefee