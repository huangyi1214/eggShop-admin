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

export function getInfo(token) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
