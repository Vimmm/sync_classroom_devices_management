const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const {name, address, tel, weixin, role, account, passwords, school} = ctx.request.body
    const weixinValue = weixin ? `'${weixin}'` : null
    const sql = `insert into user (name, address, tel, weixin, role, account, passwords) values
     ('${name}', '${address}', '${tel}', ${weixinValue}, ${role}, '${account}', '${passwords}')`
    const data = await exec(sql)
    if(Array.isArray(school) && school.length !== 0) {
        const updateSchoolSql = `update school set repairer=${data.insertId} where ID in (${school.join(',')})`
        await exec(updateSchoolSql) 
    }
    const insertDataSql = `select * from user where ID=${data.insertId}`
    const schoolsSql = `select * from school where repairer=${data.insertId}`

    const [insertUser, insertSchool] = await Promise.all([
        exec(insertDataSql),
        exec(schoolsSql)
    ])

    ctx.body = insertUser.map(it => {
        it.school = insertSchool
        return it
    })
}