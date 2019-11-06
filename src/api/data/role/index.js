import http from 'src/http.js'
import server from 'src/main.js'

export function getRoleTable() {
  return http({
    url: server + '/rest/role/getAll',
    method: 'get'
  })
}

export function getPrjData() {
  return http({
    url: server + '/rest/project/getAll',
    method: 'get'
  })
}

export function selectMineByPrjId(param) {
  return http({
    url: server + '/rest/mine/selectMineByPrjId?prjId=' + param,
    method: 'get'
  })
}

export function insertRole(query) {
  return http({
    url: server + '/rest/role/insertRole',
    method: 'post',
    data: query
  })
}

export function updateRole(query) {
  return http({
    url: server + '/rest/role/updateRole',
    method: 'post',
    data: query
  })
}

export function deleteRole(query) {
  return http({
    url: server + '/rest/role/deleteRole',
    method: 'post',
    data: query
  })
}

export function selectFileDbByParams(query) {
  return http({
    url: server + '/rest/fileDB/selectFileDbByParams',
    method: 'post',
    data: query
  })
}

export function grantInsertOrUpdate(query) {
  return http({
    url: server + '/rest/grant/grantInsertOrUpdate',
    method: 'post',
    data: query
  })
}













