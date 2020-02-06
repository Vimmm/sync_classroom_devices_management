const {exec} = require('../../db')
const SuccessModel = require('../../model/success')
const ErrorModel = require('../../model/error')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const { ID } = ctx.query
    const sql = `delete from devices where ID=${ID}`
    await exec(sql)
    ctx.body = 'ok'
}