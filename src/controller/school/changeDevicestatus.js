const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    
    const {ID, device_status} = ctx.request.body
    const sql = `update devices set device_status='${device_status}' where ID=${ID}`
    await exec(sql)
    const responseDataSql = `select * from devices where ID=${ID}`
    ctx.body = await exec(responseDataSql)
}