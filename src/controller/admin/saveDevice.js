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
        device_number, 
        device_model, 
        type,
        product_time,
        start_time,
        end_time,
        school,
        device_status
    } = ctx.request.body
    const sql = `update devices set name='${name}', 
    device_number='${device_number}', 
    device_model='${device_model}', 
    type=${type},
    product_time=${product_time},
    start_time=${start_time},
    end_time=${end_time},
    school=${school},
    device_status=${device_status}
    where ID=${ID}`
    await exec(sql)
    const responseDataSql = `select * from devices where ID=${ID}`
    ctx.body = await exec(responseDataSql)
}