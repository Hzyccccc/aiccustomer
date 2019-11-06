import http from 'src/http.js'
import server from 'src/main.js'


export function getAllPage() {
  return http({
    url: server + '/rest/AicUser/queryAllAicUser',
    method: 'get'
  })
}

export function addAicUser(param) {
  return http({
    url: server + '/rest/AicUser/addAicUser',
    method: 'get',
    param: param
  })
}



