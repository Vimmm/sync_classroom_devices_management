const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    const {cordId} = ctx.query
    const sqlRecordetail = `select * from repair_records where ID=${cordId}`
    ctx.body = await exec(sqlRecordetail)
    
    // const data = '廖莎'
    // ctx.body = data
}