const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 记录表状态：0等待受理（教学点发起申请，即生成一条记录，状态为0，修改create_time为发起时间），1接受申请， 2维修员到达， 3维修完成
    const{ID, changedStatus, currentTime, waiTime} = ctx.request.body
    const timeMap = {
        0: 'create_time',
        1: 'accept_time',
        2: 'repair_time',
        3: 'finish_time',
    }
    const sqlrecord =  (changedStatus === 1 && waiTime)
        ? `update repair_records set status='${changedStatus}', ${timeMap[changedStatus]}=${currentTime}, wait_time=${waiTime} where ID=${ID}`
        : `update repair_records set status='${changedStatus}', ${timeMap[changedStatus]}=${currentTime} where ID=${ID}`
    await exec(sqlrecord)

    const sqlall = `select * from repair_records where ID=${ID}`
    ctx.body = await exec(sqlall)
}