const { API_PREFIX } = require('../common/constants')
const logout = require('../controller/admin/logout')

module.exports = [{
    prefix: API_PREFIX,
    routes: [{
        controller: logout,
        method: 'get',
        path: '/common/logout'
    }]
}]