const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const {ID, name, address, tel, weixin, role, account, passwords, school} = ctx.request.body
    const weixinValue = weixin ? `'${weixin}'` : null
     const sql = `update user set name='${name}', address='${address}', tel='${tel}', weixin=${weixinValue},
     role=${role}, account='${account}',passwords='${passwords}' where ID=${ID}`
    await exec(sql)

    if(Array.isArray(school)) {
        const resetSchoolSql = `update school set repairer=NULL where repairer=${ID}`
        await exec(resetSchoolSql)
        if (school.length !== 0) {
            const updateSchoolSql = `update school set repairer=${ID} where ID in (${school.join(',')})`
            await exec(updateSchoolSql) 
        }
    }
    const responseDataSql = `select * from user where ID=${ID}`
    const splSchool = `select * from school where repairer=${ID}`
    const [responseData, responseSchool] = await Promise.all([
        exec(responseDataSql),
        exec(splSchool)
    ])
    ctx.body = responseData.map(user => {
            user.school = responseSchool
            return user
        })
    
}