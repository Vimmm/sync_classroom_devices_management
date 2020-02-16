const { API_PREFIX } = require('../common/constants')
const login = require('../controller/admin/login')

module.exports = [{
    prefix: API_PREFIX,
    routes: [{
        controller: login,
        method: 'post',
        path: '/login'
    }]
}]