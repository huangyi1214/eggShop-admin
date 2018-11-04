import request from '@/utils/request'

export function getList(params) {
    console.log(JSON.stringify(params));
    return request({
        url: '/orderList',
        method: 'post',
        data: params
    })
}
export function getcustomer(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/customerlist',
      method: 'post',
      data: params
    })
  }

  export function getmanager(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/managerlist',
      method: 'post',
      data: params
    })
  }
  //querymanager
  export function querymanager(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/querymanager',
      method: 'post',
      data: params
    })
  }
  //order_assign
  export function order_assign(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/order_assign',
      method: 'post',
      data: params
    })
  }
  //updateorderstatus
  export function updateorderstatus(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/updateorderstatus',
      method: 'post',
      data: params
    })
  }