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
    const {name, address, tel, weixin, role, account, password, schools} = ctx.request.body
    const weixinValue = weixin ? `'${weixin}'` : null
    const sql = `insert into user (name, address, tel, weixin, role, account, password) values
     ('${name}', '${address}', '${tel}', ${weixinValue}, ${role}, '${account}', '${password}')`
    const data = await exec(sql)
    if (data.insertId) {
        
        if(Array.isArray(schools) && schools.length !== 0) {
            const updateSchoolSql = `update school set repairer=${data.insertId} where ID in (${schools.join(',')})`
            await exec(updateSchoolSql) 
        }
        const insertDataSql = `select name, address, tel, weixin, role, account, password from user where ID=${data.insertId}`
        ctx.body = await exec(insertDataSql)
    } else {
        ctx.body = {}
    }
}