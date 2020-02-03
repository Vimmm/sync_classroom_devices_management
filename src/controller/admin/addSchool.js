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
    const {name, type, location, tel} = ctx.request.body
    const sql = `insert into school (name, type, location, tel) values ('${name}', '${type}', '${location}', '${tel}')`
    const data = await exec(sql)
    if (data.insertId) {
        const insertDataSql = `select name,location,type,tel,ID,repairer from school where ID=${data.insertId}`
        ctx.body = await exec(insertDataSql)
    } else {
        ctx.body = {}
    }
}