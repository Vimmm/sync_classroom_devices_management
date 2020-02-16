const { ADMIN_PREFIX } = require('../common/constants')
// const helloword = require('../controller/helloword')
const login = require('../controller/admin/login')

const getallSchool = require('../controller/admin/getallSchool')
const addSchool  = require('../controller/admin/addSchool')
const saveSchool  = require('../controller/admin/saveSchool')
const addDevice = require('../controller/admin/addDevice')
const saveDevice = require('../controller/admin/saveDevice')

const getallRepairer = require('../controller/admin/getallRepairer')
const addRepairer = require('../controller/admin/addRepairer')
const saveRepairer = require('../controller/admin/saveRepairer')
const removeDevice = require('../controller/admin/removeDevice')
const removeSchool = require('../controller/admin/removeSchool')
const removeRepairer = require('../controller/admin/removeRepairer')

module.exports = [{
    prefix: ADMIN_PREFIX,
    routes: [{
        controller: login,
        method: 'post',
        path: '/login'
    },{
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
    },{
        controller: removeDevice,
        method: 'get',
        path: '/removeDevice'
    },{
        controller: removeSchool,
        method: 'get',
        path: '/removeSchool'
    },{
        controller: removeRepairer,
        method: 'get',
        path: '/removeRepairer'
    }]
}]