const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const {address, tel, weixin, ID} = ctx.request.body
    const sql = `update user set address='${address}', tel='${tel}', weixin='${weixin}' where ID=${ID}`
    await exec(sql)
    const responseDataSql = `select * from user where ID=${ID}`
    ctx.body = await exec(responseDataSql)
}