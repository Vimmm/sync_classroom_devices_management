const {API_PREFIX} = require('../common/constants')
// const helloword = require('../controller/helloword')
const getallSchool = require('../controller/admin/getallSchool')
const addSchool  = require('../controller/admin/addSchool')
const saveSchool  = require('../controller/admin/saveSchool')
const addDevice = require('../controller/admin/addDevice')
const saveDevice = require('../controller/admin/saveDevice')

const getallRepairer = require('../controller/admin/getallRepairer')
const addRepairer = require('../controller/admin/addRepairer')
const saveRepairer = require('../controller/admin/saveRepairer')
module.exports = [{
    prefix: `${API_PREFIX}`,
    routes: [{
        controller: getallSchool,
        method: 'get',
        path: '/getallSchool'
    },{
        controller: addSchool,
        method: 'post',
        path: '/addSchool'
    },{
        controller: saveSchool,
        method: 'post',
        path: '/saveSchool'
    },{
        controller: addDevice,
        method: 'post',
        path: '/addDevice'
    },{
        controller: saveDevice,
        method: 'post',
        path: '/saveDevice'
    },{
        controller: getallRepairer,
        method: 'get',
        path: '/getallRepairer'
    },{
        controller: addRepairer,
        method: 'post',
        path: '/addRepairer'
    },{
        controller: saveRepairer,
        method: 'post',
        path: '/saveRepairer'
    }]
}]