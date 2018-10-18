import request from '@/utils/request'

export function getList(params) {
  console.log(JSON.stringify(params));
  return request({
    url: '/customerlist',
    method: 'post',
    data: params
  })
}
