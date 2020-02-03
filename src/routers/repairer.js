const {API_PREFIX} = require('../common/constants')
const getUserinfo = require('../controller/school/getUserinfo') 

 
module.exports = [{
    prefix: `${API_PREFIX}`,
    routes: [{
        controller: getUserinfo,
        method: 'get',
        path: '/getUserinfo'
    }]
}]