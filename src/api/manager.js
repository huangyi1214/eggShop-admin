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

export function setIsadmin(params) {
    return request({
        url: '/setIsadmin',
        method: 'post',
        data: params
    })
}
export function setIsinternal(params) {
    return request({
        url: '/setIsinternal',
        method: 'post',
        data: params
    })
}