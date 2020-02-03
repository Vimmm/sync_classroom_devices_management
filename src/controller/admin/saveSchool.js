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
    const {name, type, location, tel, ID} = ctx.request.body
    const sql = `update school set name='${name}', type='${type}', location='${location}', tel='${tel}' where ID=${ID}`
    await exec(sql)
    const responseDataSql = `select name,location,type,tel,ID,repairer from school where ID=${ID}`
    ctx.body = await exec(responseDataSql)
}