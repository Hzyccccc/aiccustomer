import http from 'src/http.js'
import server from 'src/main.js'


export function queryAllAicUser() {
  return http({
    url: server + '/rest/AicUser/queryAllAicUser',
    method: 'get'
  })
}

export function queryAicAudit(param) {
  return http({
    url: server + '/rest/aicAudit/queryAicAudit',
    method: 'post',
    param: param
  })
}



