import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/token',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/profile',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/token',
    method: 'delete'
  })
}

