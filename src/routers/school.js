const {API_PREFIX} = require('../common/constants')
const getSchool = require('../controller/school/getSchool')
const applyRepair = require('../controller/school/applyRepair')
const getSchoolRepairecord = require('../controller/school/getSchoolRepairecord')
const getRepairecord = require('../controller/school/getRepairecord') 
 
module.exports = [{
    prefix: `${API_PREFIX}`,
    routes: [{
        controller: getSchool,
        method: 'get',
        path: '/getSchool'
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