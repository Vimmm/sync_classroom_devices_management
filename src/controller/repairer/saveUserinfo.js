const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const {name,address, tel, weixin, passwords} = ctx.request.body

    const ID = ctx.state.userId
    const account = ctx.state.account

    const sql = `update user set name='${name}',address='${address}', tel='${tel}', weixin='${weixin}', role=2, account='${account}', passwords='${passwords}' where ID=${ID}`
    await exec(sql)
    const responseDataSql = `select * from user where ID=${ID}`
    const [user] = await exec(responseDataSql)

    const sqlSchool = `select * from school where repairer=${user.ID}`
    const schools = await exec(sqlSchool)

    if(Array.isArray(schools) && schools.length !== 0) {
        const schoolsInSql = schools.map(school => school.ID).join(',')
        const sqlDevices = `select * from devices where school in (${schoolsInSql})`
        // const statusSql = `select * from repair_records where school in (${schoolsInSql})`
        const devices = await exec(sqlDevices)
        
        user.schools = schools.map(school => {
            school.devices = devices.filter(device => device.school === school.ID)
            return school
        })
    }

    ctx.body = [user]
}