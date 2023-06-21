import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfoApi(token) {

  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logoutApi() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}


