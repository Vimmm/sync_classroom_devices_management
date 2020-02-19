const { SCHOOL_PREFIX } = require('../common/constants')
const getSchool = require('../controller/school/getSchool')
const saveSchool  = require('../controller/admin/saveSchool')
const saveDevice = require('../controller/admin/saveDevice')
const addDevice = require('../controller/admin/addDevice')
const changeDevicestatus = require('../controller/school/changeDevicestatus') 

const applyRepair = require('../controller/school/applyRepair')
const getSchoolRepairecord = require('../controller/school/getSchoolRepairecord')
const getRepairecord = require('../controller/school/getRepairecord') 
 
module.exports = [{
    prefix: SCHOOL_PREFIX,
    routes: [{
        controller: getSchool,
        method: 'get',
        path: '/getSchool'
    },{
        controller: saveSchool,
        method: 'post',
        path: '/saveSchool'
    },{
        controller: saveDevice,
        method: 'post',
        path: '/saveDevice'
    },{
        controller: addDevice,
        method: 'post',
        path: '/addDevice'
    },{
        controller: changeDevicestatus,
        method: 'post',
        path: '/changeDevicestatus'
    },{
        controller: applyRepair,
        method: 'post',
        path: '/applyRepair'
    },{
        controller: getSchoolRepairecord,
        method: 'get',
        path: '/getSchoolRepairecord'
    },{
        controller: getRepairecord,
        method: 'get',
        path: '/getRepairecord'
    }]
}]