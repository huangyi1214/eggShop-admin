import request from '@/utils/request'

export function menucreate(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/menucreate',
    method: 'post',
    data: params
  })
}


export function menuupdate(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/menuupdate',
      method: 'post',
      data: params
    })
  }


export function menudelete(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/menudelete',
      method: 'post',
      data: params
    })
  }


export function menuquery(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/menuquery',
      method: 'post',
      data: params
    })
  }

  export function rolecreate(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/rolecreate',
      method: 'post',
      data: params
    })
  }


export function roleupdate(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/roleupdate',
      method: 'post',
      data: params
    })
  }


export function roledelete(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/roledelete',
      method: 'post',
      data: params
    })
  }

export function rolequery(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/rolequery',
      method: 'post',
      data: params
    })
  }

export function rolenemucreate(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/rolenemucreate',
      method: 'post',
      data: params
    })
  }

export function rolemenudelete(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/rolemenudelete',
      method: 'post',
      data: params
    })
  }







  export function rolemenuquery(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/rolemenuquery',
      method: 'post',
      data: params
    })
  }
  export function userrolecreate(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/userrolecreate',
      method: 'post',
      data: params
    })
  }
  export function userroledelete(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/userroledelete',
      method: 'post',
      data: params
    })
  }
  export function userrolequery(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/userrolequery',
      method: 'post',
      data: params
    })
  }
  export function rolemenuedit(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/rolemenuedit',
      method: 'post',
      data: params
    })
  }
  //queryuserforadmin

  export function queryuserforadmin(params) {
    console.log(JSON.stringify(params));
    return request({
      url: '/queryuserforadmin',
      method: 'post',
      data: params
    })
  }