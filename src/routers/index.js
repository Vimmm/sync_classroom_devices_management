const {API_PREFIX} = require('../common/constants')
const helloword = require('../controller/helloword')
module.exports = [{
    prefix: `${API_PREFIX}`,
    routes: [{
        controller: helloword,
        method: 'get',
        path: '/hello-word'
    }]
}]