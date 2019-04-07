import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(tokenKey) {
  tokenKey = tokenKey || TokenKey
  return Cookies.get(tokenKey)
}

export function setToken(tokenKey,token) {
  tokenKey = tokenKey || TokenKey
  return Cookies.set(TokenKey, token)
}

export function removeToken(tokenKey) {
  tokenKey = tokenKey || TokenKey
  return Cookies.remove(TokenKey)
}