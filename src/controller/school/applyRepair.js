const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // console.log(school)
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const {school, device, comment} = ctx.request.body
    const createTimeValue = Date.now()
    const statusValue = 1
    const getRepairSql = `select repairer from school where ID=${school}`
    const [{repairer}] = await exec(getRepairSql)
    console.log(repairer)
    const sql = `insert into repair_records (school, device, comment, create_time, status, repairer) 
    values (${school}, ${device}, '${comment}', ${createTimeValue}, ${statusValue}, ${repairer})`
    const data = await exec(sql)
    if (data.insertId) {
        const responseDataSql = `select * from repair_records where ID=${data.insertId}`
        ctx.body = await exec(responseDataSql)
    }else{
        ctx.body = {}
    }
}