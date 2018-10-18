import request from '@/utils/request'

export function getList(params) {
    console.log(JSON.stringify(params));
    return request({
        url: '/managerlist',
        method: 'post',
        data: params
    })
}
export function getType() {
    return request({
        url: '/typelist',
        method: 'get'
    })
}