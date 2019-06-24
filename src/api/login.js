import request from '@/utils/request'

export function login(phone, password, type) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      phone,
      password,
      type
    }
  })
}

export function getInfo() {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params: {  }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
