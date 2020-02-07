const {API_PREFIX} = require('../common/constants')
const getUserinfo = require('../controller/repairer/getUserinfo') 
const saveUserinfo = require('../controller/repairer/saveUserinfo') 
const getApplyrecords = require('../controller/repairer/getApplyrecords') 
const changerecordstatus = require('../controller/repairer/changerecordstatus') 

 
module.exports = [{
    prefix: `${API_PREFIX}`,
    routes: [{
        controller: getUserinfo,
        method: 'get',
        path: '/getUserinfo'
    },{
        controller: saveUserinfo,
        method: 'post',
        path: '/saveUserinfo'
    },{
        controller: getApplyrecords,
        method: 'get',
        path: '/getApplyrecords'
    },{
        controller: changerecordstatus,
        method: 'post',
        path: '/changerecordstatus'
    }]
}]