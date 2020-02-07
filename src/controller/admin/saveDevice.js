const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const {
        ID,
        name,
        deviceNumber, 
        deviceModel, 
        type,
        productTime,
        startTime,
        endTime,
        school,
        deviceStatus
    } = ctx.request.body
    const sql = `update devices set name='${name}', 
    device_number='${deviceNumber}', 
    device_model='${deviceModel}', 
    type=${type},
    product_time=${productTime},
    start_time=${startTime},
    end_time=${endTime},
    school=${school},
    device_status=${deviceStatus}
    where ID=${ID}`
    await exec(sql)
    const responseDataSql = `select * from devices where ID=${ID}`
    ctx.body = await exec(responseDataSql)
}