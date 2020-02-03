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
    const {ID, name, address, tel, weixin, role, account, password, schools} = ctx.request.body
    const weixinValue = weixin ? `'${weixin}'` : null
     const sql = `update user set name='${name}', address='${address}', tel='${tel}', weixin=${weixinValue},
     role=${role}, account='${account}',password='${password}' where ID=${ID}`
    await exec(sql)

    if(Array.isArray(schools) && schools.length !== 0) {
        const resetSchoolSql = `update school set repairer=NULL where repairer=${ID}`
        const updateSchoolSql = `update school set repairer=${ID} where ID in (${schools.join(',')})`
        await exec(resetSchoolSql) 
        await exec(updateSchoolSql) 
    }
    const responseDataSql = `select name, address, tel, weixin, role, account, password from user where ID=${ID}`
    ctx.body = await exec(responseDataSql)
    
}