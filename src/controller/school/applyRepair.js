const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const {device, comment} = ctx.request.body
    const school = ctx.state.userId
    const createTimeValue = Date.now()
    const statusValue = 0
    const getRepairSql = `select repairer from school where ID=${school}`
    const [{repairer}] = await exec(getRepairSql)
    const sql = `insert into repair_records (school, device, comment, create_time, status, repairer) 
    values (${school}, ${device}, '${comment}', ${createTimeValue}, ${statusValue}, ${repairer})`
    const data = await exec(sql)
    ctx.body = !!data.insertId
}