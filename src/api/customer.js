import request from '@/utils/request'

export function getOrder(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/getOrder',
    method: 'post',
    data: params
  })
}

export function sendOrder(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/sendOrder',
    method: 'post',
    data: params
  })
}
export function acceptOrder(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/acceptOrder',
    method: 'post',
    data: params
  })
}
export function getAcceptOrder(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/getAcceptOrder',
    method: 'post',
    data: params
  })
}

export function getonelineusercount(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/getonelineusercount',
    method: 'post',
    data: params
  })
}
