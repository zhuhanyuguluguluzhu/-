import service from '@/request/index'

export default function login(phone, psw) {
  return service({
    method: 'GET',
    url:`/login/cellphone?phone=${phone}&password=${psw}`
  })
}