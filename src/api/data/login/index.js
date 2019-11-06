import http from 'src/http.js'
import server from 'src/main.js'
export function login(query) {
  return http({
    url: server + '/rest/aicCustomer/login',
    method: 'post',
    code: query.userName,
    pwd: query.password
  })
}



